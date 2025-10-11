// test.ts
import { PerritosAdoptCreateData } from "@/api";
import { perritosList, perritosRetrieve, perritosTopRetrieve, perritosAdoptCreate } from "@/api/sdk.gen";

async function testPerritosTopList() {
  try {
    console.log("Testing perritosTopList...");
    const res = await perritosTopRetrieve({ security: [] }); // 👈 quita auth si es público
    
    console.log("Respuesta de perritosTopList:", res);
  } catch (err) {
    console.error("Error al llamar a perritosTopList:", err);
  }
}

async function testPerritosList() {
    try {
      console.log("Testing perritosList...");
      const res = await perritosList({ security: [] });
      console.log("Respuesta de perritosList:", res);
    } catch (err) {
      console.error("Error al llamar a perritosList:", err);
    }
}

async function testPerritosRetrieve() {
    try {
      console.log("Testing perritosRetrieve...");
      // Reemplaza '1' con un ID de perro válido que exista en tu base de datos de prueba
      const res = await perritosRetrieve({ path: { id: 1 }, security: [] });
      console.log("Respuesta de perritosRetrieve:", res.data?.data);
    } catch (err) {
      console.error("Error al llamar a perritosRetrieve:", err);
    }
}

async function testperritosAdoptCreateOnlyRequired() {
  try {
    console.log("Testing testperritosAdoptCreateOnlyRequired...");

    const formAdoptionData: PerritosAdoptCreateData = {
      body: {
        datos_del_animal: {
          dog_id: 9, // Reemplaza con un ID de perro válido
        },
        datos_del_solicitante: {
          adpt_name: "Juan Pérez",
          adpt_age: 30,
          adpt_address: "Calle Falsa 123, Ciudad Ejemplo",
        },
        sobre_el_espacio: {
          // Opcional
        },
        sobre_el_cuidado: {
          // Opcional
        },
      },
      url: "/api/perritos/adopt/",
    };

    const res = await perritosAdoptCreate(formAdoptionData);
    console.log("Respuesta de perritosAdoptCreate:", res);
  } catch (err) {
    console.error("Error al llamar a perritosAdoptCreate:", err);
  }
}
async function testperritosAdoptCreateComplete() {
  try {
    console.log("Testing testperritosAdoptCreateComplete...");

    const formAdoptionData: PerritosAdoptCreateData = {
      body: {
        datos_del_animal: {
          dog_id: 10, // Reemplaza con un ID de perro válido
        },
        datos_del_solicitante: {
          adpt_name: "Juan Pérez",
          adpt_age: 30,
          adpt_address: "Calle Falsa 123, Ciudad Ejemplo",
          adpt_form_field1: "Campo opcional 1",
          adpt_form_field2: "Campo opcional 2",
          adpt_form_field3: "Campo opcional 3",
          adpt_form_field4: "Campo opcional 4",
          adpt_form_field5: "Campo opcional 5",
          adpt_form_field6: "Campo opcional 6",
          adpt_form_field7: true,
          adopt_form_field8: "Campo opcional 8",
        },
        sobre_el_espacio: {
          living_form_field1: "Casa con patio grande",
          living_form_field3: true,
          living_form_field4: "Sí, completamente cercado",
          living_form_field5: "Dentro de casa",
          living_form_field6: false,
          living_form_field7: "No hay otros animales",
          living_form_field8: "Sí, todos en la familia están de acuerdo",
          living_form_field9: "Juan Pérez, el solicitante",
          living_form_field10: "8 horas al día",
          living_form_field11: "Se contratará un paseador de perros",
        },
        sobre_el_cuidado: {
          dogcare_field1: "Sí, experiencia previa con perros",
          dogcare_field2: true,
          dogcare_field3: "Comida seca de alta calidad",
          dogcare_field4: true,
          dogcare_field5: "Sí, se llevará al veterinario anualmente",
          dogcare_field6: "Sí, estoy dispuesto a cubrir gastos imprevistos",
          dogcare_field7: "Paseos diarios y juegos en el patio",
          dogcare_field8: "Sí, se contratará a un entrenador si es necesario",
          dogcare_field9: "En caso de vacaciones, se quedará con un familiar",
        },
      },
      url: "/api/perritos/adopt/",
    };

    const res = await perritosAdoptCreate(formAdoptionData);
    console.log("Respuesta de perritosAdoptCreate:", res);
  } catch (err) {
    console.error("Error al llamar a perritosAdoptCreate:", err);
  }
}


async function main() {
  await testPerritosTopList();
  console.log("\n" + "=".repeat(50) + "\n");
  await testPerritosList();
  console.log("\n" + "=".repeat(50) + "\n");
  await testPerritosRetrieve();
  console.log("\n" + "=".repeat(50) + "\n");
  await testperritosAdoptCreateOnlyRequired();
  console.log("\n" + "=".repeat(50) + "\n");
  await testperritosAdoptCreateComplete();
  console.log("\n" + "=".repeat(50) + "\n");
}

main();