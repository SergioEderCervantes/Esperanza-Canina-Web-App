from pathlib import Path

from PIL import Image


def convertir_a_webp(ruta_directorio, calidad=95, usar_lossless=False):
    # Asegurar que la ruta sea absoluta
    ruta = Path(ruta_directorio).expanduser().resolve()

    if not ruta.exists() or not ruta.is_dir():
        print(f"❌ La ruta {ruta} no es válida o no es un directorio.")
        return

    extensiones = [".jpg", ".JPG", ".jpeg", ".png", ".bmp", ".tiff"]

    for archivo in ruta.iterdir():
        if archivo.suffix.lower() in extensiones:
            try:
                # Nuevo nombre para la original
                original_renombrado = archivo.with_name(archivo.stem + "_original" + archivo.suffix)
                # Nombre de la webp (mantiene el nombre original)
                salida_webp = archivo.with_suffix(".webp")

                # Renombrar original
                archivo.rename(original_renombrado)

                # Abrir imagen
                img = Image.open(original_renombrado)

                # Guardar como WebP
                if usar_lossless:
                    img.save(salida_webp, "WEBP", lossless=True)
                else:
                    img.save(salida_webp, "WEBP", quality=calidad)

                print(f"✔ {archivo.name} → {salida_webp.name} (original → {original_renombrado.name})")

            except Exception as e:
                print(f"❌ Error con {archivo.name}: {e}")

# Ejemplo de uso:
# convertir_a_webp("/home/usuario/imagenes", calidad=95)
# convertir_a_webp("/home/usuario/imagenes", usar_lossless=True)


if __name__ == "__main__":
    path = input("Dame la ruta donde estan las imagenes a convertir: ")
    convertir_a_webp(path, 80)
    print("Conversion completada")
