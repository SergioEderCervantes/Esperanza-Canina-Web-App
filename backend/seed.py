
import os
import django
import random
from datetime import date, timedelta

# Configura el entorno de Django para poder usar los modelos
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.core.settings')
django.setup()

from app.dogs_api.models import Dog, DogImage, Beheavior

def clear_data():
    """Elimina todos los datos de los modelos para empezar desde cero."""
    print("Limpiando la base de datos...")
    DogImage.objects.all().delete()
    Dog.objects.all().delete()
    Beheavior.objects.all().delete()
    print("Datos eliminados.")

def seed_behaviors():
    """Crea un conjunto de comportamientos predefinidos."""
    print("Creando comportamientos (Behaviors)...")
    behaviors_data = [
        {"name": "Juguetón", "desc": "Le encanta jugar y necesita actividad física regular."},
        {"name": "Tranquilo", "desc": "Prefiere un ambiente calmado y disfruta de largas siestas."},
        {"name": "Sociable", "desc": "Se lleva bien con otros perros y le gusta conocer gente nueva."},
        {"name": "Tímido", "desc": "Es reservado con los extraños y necesita tiempo para adaptarse."},
        {"name": "Energético", "desc": "Tiene mucha energía y es ideal para personas activas."},
        {"name": "Leal", "desc": "Forma un fuerte vínculo con su familia y es muy protector."},
    ]
    
    created_behaviors = []
    for data in behaviors_data:
        behavior, created = Beheavior.objects.get_or_create(
            beheavior_name=data["name"],
            defaults={'beheavior_description': data["desc"]}
        )
        if created:
            print(f"  - Creado: {behavior.beheavior_name}")
    
    print("Comportamientos creados.")
    return Beheavior.objects.all()

def seed_dogs(behaviors, num_dogs=20):
    """Crea un número específico de perros con datos aleatorios."""
    print(f"Creando {num_dogs} perros...")
    
    dog_names = [
        "Max", "Buddy", "Lucy", "Daisy", "Rocky", "Luna", "Coco", "Toby", "Bella", "Zeus",
        "Milo", "Ruby", "Oscar", "Penny", "Leo", "Zoe", "Winston", "Lola", "Jax", "Nala"
    ]
    
    placeholder_image_url = "https://placehold.co/1400x400"

    for i in range(num_dogs):
        name = random.choice(dog_names) + f" {i+1}" # Para asegurar nombres únicos
        
        # Crear el perro
        dog = Dog.objects.create(
            name=name,
            age_year=random.randint(0, 8),
            age_month=random.randint(0, 11),
            genre=random.choice(["H", "M"]),
            adoption_state=False,
            size=random.choice(["S", "M", "L"]),
            arrive_date=date.today() - timedelta(days=random.randint(10, 365)),
            description=f"Este es {name}, un perro amigable y cariñoso en busca de un hogar. Su descripción detallada estará disponible pronto."
        )
        
        # Asignar comportamientos aleatorios
        num_behaviors = random.randint(1, 3)
        random_behaviors = random.sample(list(behaviors), num_behaviors)
        dog.beheaviors.set(random_behaviors)
        
        # Crear y asignar la imagen de placeholder
        DogImage.objects.create(
            dog=dog,
            image=placeholder_image_url,
            is_primary=True
        )
        
        print(f"  - Creado perro: {dog.name}")

    print(f"{num_dogs} perros creados con éxito.")


if __name__ == "__main__":
    print("--- Iniciando el script de seeding ---")
    
    # Advertencia: Descomentar la siguiente línea si quieres limpiar la BD cada vez que ejecutes el script.
    clear_data()
    print("Cuantos perros quieres que se generen? ")
    num_perros = int(input())
    
    # Comprobación para no duplicar datos masivamente
    if Dog.objects.exists():
        print("\nAdvertencia: Ya existen perros en la base de datos.")
        print("Si quieres empezar de cero, descomenta la línea 'clear_data()' en el script.")
        print("¿Quieres intentar ejecutar la seed con la data existente, con riesgo de error de duplicidad?")
        response = input("y/n\n")
        if response == 'y':
            all_behaviors = seed_behaviors()
            seed_dogs(all_behaviors,num_dogs=num_perros)
            print("\n--- Seeding completado con éxito ---")
            
    else:
        all_behaviors = seed_behaviors()
        seed_dogs(all_behaviors, num_dogs=num_perros)
        print("\n--- Seeding completado con éxito ---")
