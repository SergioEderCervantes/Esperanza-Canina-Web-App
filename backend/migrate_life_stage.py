import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.core.settings")
django.setup()

from app.dogs_api.models import Dog


def migrate_life_stages():
    """Migra age_year/age_month a life_stage para todos los perros existentes"""
    dogs = Dog.objects.all()
    updated = 0

    for dog in dogs:
        # Calcular life_stage basado en age_year/age_month
        if dog.age_year == 0 and dog.age_month < 6:
            dog.life_stage = "CACHORRO"
        elif dog.age_year < 2:
            dog.life_stage = "JOVEN"
        elif dog.age_year < 7:
            dog.life_stage = "ADULTO"
        else:
            dog.life_stage = "ADULTO_MAYOR"

        dog.save()
        updated += 1
        print(f"✓ {dog.name}: {dog.get_life_stage_display()} (era {dog.age_year}a {dog.age_month}m)")

    print(f"\n✓ {updated} perros actualizados con life_stage")

if __name__ == "__main__":
    print("--- Migrando datos de age_year/age_month a life_stage ---\n")
    migrate_life_stages()
    print("\n--- Migración completada ---")
