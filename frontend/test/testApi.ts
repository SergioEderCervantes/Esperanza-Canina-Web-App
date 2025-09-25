// test.ts
import { perritosList, perritosRetrieve, perritosTopRetrieve } from "@/api/sdk.gen";

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


async function main() {
  await testPerritosTopList();
  console.log("\n" + "=".repeat(50) + "\n");
  await testPerritosList();
  console.log("\n" + "=".repeat(50) + "\n");
  await testPerritosRetrieve();
  console.log("\n" + "=".repeat(50) + "\n");
}

main();