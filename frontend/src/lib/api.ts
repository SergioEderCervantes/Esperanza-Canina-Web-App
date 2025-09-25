// IMPORTANT: Este codigo esta generado por ia y no es funcional, sin embargo me dejo la base e idea de lo que voy a hacer para 
// el wrapper de la api, por el momento lo dejo aqui pero que se sepa que no esta listo y no sirve


// import { Api } from '@/api';

// Lee la URL base de tu API desde las variables de entorno
// Esto es más seguro y flexible que tenerla hardcodeada.
// const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

// Crea una instancia única del SDK de tu API
// Esto asegura que la configuración se comparta en toda la app.
// const api = new Api({
//     baseUrl: API_BASE_URL,
// });

/**
 * Obtiene la lista de todos los perros.
 * Esta función envuelve la llamada del SDK generado.
 * Aquí es donde controlaremos el cache.
 */
// export async function getDogs() {
    // Llama al método correspondiente de tu SDK generado
    // El método real puede tener un nombre diferente (ej: dogsList, dogsRetrieve, etc.)
    // Revisa tu `sdk.gen.ts` para el nombre exacto.
    // Usamos el fetch personalizado de Next.js para el cache.
    // return await api.dogs.dogsList({
        // Aquí puedes pasar opciones de cache de Next.js
        // Por ejemplo, para revalidar cada hora: next: { revalidate: 3600 }
    // });
// }

/**
 * Obtiene un perro específico por su ID.
 */
// export async function getDogById(id: number) {
//     return await api.dogs.dogsRetrieve({ id });
// }
