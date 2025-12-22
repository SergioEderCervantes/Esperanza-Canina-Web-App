import { FormularioAdopcion, perritosAdoptCreate, PerritosAdoptCreateData } from "@/api";

export default async function adoptionFormManager(
  formData: FormularioAdopcion
) : Promise<boolean> {
  try {
    const adoptionRequest: PerritosAdoptCreateData = {
      body: formData,
      url: "/perritos/adopt/",
    };
    const res = await perritosAdoptCreate(adoptionRequest);
    return true;
  } catch (err) {
    console.error("Error al llamar a perritosAdoptCreate:", err);
    return false;
  }
}
