
import os
import subprocess
from dataclasses import dataclass

from django.conf import settings
from django.core.mail import EmailMessage
from docx import Document

from app.dogs_api.adoption_form_domain import FormularioAdopcion


@dataclass
class AdoptionFormManager:
    domain_object: FormularioAdopcion
    TEMPLATE_DOCX_PATH: str = "app/form_templates/Prueba_formulario_1.docx"
    FILLED_DOCX_PATH: str = "app/form_templates/filled_form.docx"
    FILLED_PDF_DIR: str = "app/form_templates/"
    FILLED_PDF_PATH: str = "app/form_templates/filled_form.pdf"

    def execute(self):
        self.fill_docx()
        self.docx_to_pdf()
        self.send_mail()
        self.cleanup()



    def fill_docx(self):
        """
        Rellena placeholders tipo {{key}} en los párrafos de un .docx y guarda el resultado.
        """
        doc = Document(self.TEMPLATE_DOCX_PATH)
        context = self.domain_object.make_data_dict()

        # Recorremos todos los párrafos del documento
        for paragraph in doc.paragraphs:
            # Si el párrafo no contiene ninguno de los placeholders, lo saltamos rápido
            if not any(f"{{{{{k}}}}}" in paragraph.text for k in context):
                continue

            # Los párrafos están compuestos por "runs" (fragmentos con formato propio).
            # Muchas veces un placeholder se puede partir en varios runs, así que:
            runs = paragraph.runs
            full_text = "".join(run.text for run in runs)

            # Reemplazamos todos los placeholders en el texto completo del párrafo
            for key, val in context.items():
                placeholder = f"{{{{{key}}}}}"
                if isinstance(val, bool):
                    val = "Si" if val else "No"
                elif isinstance(val, (int, float)):
                    val = str(val)
                full_text = full_text.replace(placeholder, val)

            # Escribimos el texto resultante de vuelta en los runs:
            # - dejamos el primer run con todo el texto nuevo (preserva su estilo),
            # - vaciamos los runs siguientes para evitar texto duplicado.
            if runs:
                runs[0].text = full_text
                for r in runs[1:]:
                    r.text = ""
            else:
                # Si por alguna razón no hay runs (raro), creamos uno nuevo
                paragraph.add_run(full_text)

        # Guardar documento modificado
        doc.save(self.FILLED_DOCX_PATH)

    def docx_to_pdf(self):
        subprocess.run([
            "libreoffice", "--headless", "--convert-to", "pdf", self.FILLED_DOCX_PATH, "--outdir", self.FILLED_PDF_DIR
        ], check=True)

    def send_mail(self):
        html = f"<h1>Solicitud de adopcion recibida!!!</h1><p>Una persona ha solicitado la adopcion de {self.domain_object.datos_del_animal.dog_name}, los datos de la adopcion se encuentran en el siguiente pdf</p>"
        email = EmailMessage(
            subject="Solicitud de adopcion Esperanza Canina",
            body=html,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=settings.DESTINATARY_EMAIL,
        )
        email.content_subtype = "html"
        email.attach_file(self.FILLED_PDF_PATH)
        try:
            email.send(fail_silently=False)
            print("Correo HTML enviado exitosamente con EmailMessage.")
        except Exception as e:
            print(f"Error al enviar correo: {e}")


    def cleanup(self):
        for path in [self.FILLED_DOCX_PATH, self.FILLED_PDF_PATH]:
            try:
                if os.path.exists(path):
                    os.remove(path)
            except Exception as e:
                print(f"Error deleting {path}: {e}")

