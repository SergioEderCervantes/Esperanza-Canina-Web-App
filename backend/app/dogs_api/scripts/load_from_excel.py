from pathlib import Path

import cloudinary.uploader
import pandas as pd
from django.conf import settings
from django.core.files import File
from django.db import transaction
from django.utils import timezone

from app.dogs_api.models import Dog, DogImage  # ⬅️ AJUSTA ESTO

SEX_MAP = {
    "Macho": "M",
    "Hembra": "H",
}

SIZE_MAP = {
    "Chico": "S",
    "Mediano": "M",
    "Grande": "L",
}

LIFE_STAGE_MAP = {
    "Cachorro": "CACHORRO",
    "Joven": "JOVEN",
    "Adulto": "ADULTO",
    "Adulto Mayor": "ADULTO_MAYOR",
}

def upload_foto(file) -> str:
    upload_result = cloudinary.uploader.upload(
        file,
        folder=f"dog_images/{settings.CLOUDINARY_FOLDER}",
        resource_type="image",
    )
    print(upload_result["public_id"])
    return upload_result["public_id"]


def importar_dogs_con_imagenes(dry_run=False):
    excel_path: Path = Path(settings.DOG_DATA_EXCEL_PATH)
    images_root: Path = Path(settings.DOG_IMAGES_DIR_PATH)

    print("🧪 MODO DRY-RUN ACTIVADO" if dry_run else "🚀 IMPORTACIÓN REAL")
    print(f"📄 Excel: {excel_path}")
    print(f"📁 Imágenes: {images_root}")
    print("──────────────────────────────")

    if not excel_path.exists():
        print(f"❌ No existe el archivo Excel: {excel_path}")
        return

    if not images_root.exists():
        print(f"⚠️  Directorio de imágenes no existe: {images_root}")

    df = pd.read_excel(excel_path, header=1)

    creados = 0
    errores = 0
    perros_sin_imagenes = 0

    for index, row in df.iterrows():
        try:
            numero = str(row["NUMERO"]).strip()

            sexo = SEX_MAP[str(row["SEXO"]).strip()]
            etapa = LIFE_STAGE_MAP[str(row["EDAD"]).strip()]
            tamano = SIZE_MAP[str(row["TAMAÑO"]).strip()]
            observaciones = str(row.get("OBSERVACIONES", "")).strip()

            carpeta_perro = images_root / numero

            print(f"\n🐕 Procesando perro #{numero}")

            imagenes = []
            if carpeta_perro.exists() and carpeta_perro.is_dir():
                imagenes = sorted(
                    [f for f in carpeta_perro.iterdir() if f.suffix.lower() == ".webp"]
                )

                if imagenes:
                    print(f"🖼️  Imágenes encontradas ({len(imagenes)}):")
                    for img in imagenes:
                        print(f"   - {img.name}")
                else:
                    print("⚠️  Carpeta encontrada pero sin imágenes .webp")
                    perros_sin_imagenes += 1
            else:
                print("⚠️  Carpeta NO encontrada → se creará el Dog sin imágenes")
                perros_sin_imagenes += 1

            dog_data = dict(
                name="",
                genre=sexo,
                life_stage=etapa,
                size=tamano,
                section="4",
                adoption_state=False,
                description=observaciones,
                arrive_date=timezone.now().date(),
            )

            if dry_run:
                print("🧾 Dog a crear:")
                print(dog_data)
                creados += 1
                continue

            # ───── Creación real ─────
            with transaction.atomic():
                dog = Dog.objects.create(**dog_data)

                for i, imagen_path in enumerate(imagenes):

                    with open(imagen_path, "rb") as f:
                        public_id = upload_foto(File(f))
                        dog_image:DogImage = DogImage(dog=dog, image=public_id, is_primary=(i == 0))

                        dog_image.save()

                creados += 1

        except Exception as e:
            errores += 1
            print(f"❌ Fila {index + 2} (NUMERO={row.get('NUMERO')}): {e}")

    print("\n──────────────────────────────")
    print(f"✅ Perros procesados: {creados}")
    print(f"⚠️ Perros sin imágenes: {perros_sin_imagenes}")
    print(f"❌ Errores: {errores}")
