import type { FormularioAdopcion } from "@/api/types.gen";
import CustomCheckbox from '../CustomCheckbox';
interface SectionProps {
  formData: FormularioAdopcion;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function SobreElCuidadoSection({
  formData,
  handleChange,
}: SectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">
        Sobre el Cuidado y Calidad de Vida
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field1"
            className="mb-2 font-medium"
          >
            ¿Qué te hace ser la persona indicada para adoptar a este perrito?
          </label>
          <textarea
            id="sobre_el_cuidado.dogcare_field1"
            name="sobre_el_cuidado.dogcare_field1"
            value={formData.sobre_el_cuidado.dogcare_field1 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <CustomCheckbox
          id="sobre_el_cuidado.dogcare_field2"
          name="sobre_el_cuidado.dogcare_field2"
          checked={formData.sobre_el_cuidado.dogcare_field2 || false}
          onChange={handleChange}
          label="¿Hay niños en casa?"
        />

        {formData.sobre_el_cuidado.dogcare_field2 && (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="sobre_el_cuidado.dogcare_field3"
                className="mb-2 font-medium"
              >
                ¿De qué edades?
              </label>
              <input
                type="text"
                id="sobre_el_cuidado.dogcare_field3"
                name="sobre_el_cuidado.dogcare_field3"
                value={formData.sobre_el_cuidado.dogcare_field3 || ""}
                onChange={handleChange}
                className="p-2 border-2 rounded"
              />
            </div>
            <CustomCheckbox
              id="sobre_el_cuidado.dogcare_field4"
              name="sobre_el_cuidado.dogcare_field4"
              checked={formData.sobre_el_cuidado.dogcare_field4 || false}
              onChange={handleChange}
              label="¿Están acostumbrados a convivir con perros?"
            />
          </>
        )}

        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field5"
            className="mb-2 font-medium"
          >
            ¿Qué harás con si tu adoptado muerde a alguno de los niños o adultos
            de la casa?
          </label>
          <textarea
            id="sobre_el_cuidado.dogcare_field5"
            name="sobre_el_cuidado.dogcare_field5"
            value={formData.sobre_el_cuidado.dogcare_field5 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field6"
            className="mb-2 font-medium"
          >
            ¿Qué pasará con el perrito cuando salgas de vacaciones?
          </label>
          <input
            type="text"
            id="sobre_el_cuidado.dogcare_field6"
            name="sobre_el_cuidado.dogcare_field6"
            value={formData.sobre_el_cuidado.dogcare_field6 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field7"
            className="mb-2 font-medium"
          >
            ¿En qué espacio va a dormir, comer y defecar tu perrito?
          </label>
          <input
            type="text"
            id="sobre_el_cuidado.dogcare_field7"
            name="sobre_el_cuidado.dogcare_field7"
            value={formData.sobre_el_cuidado.dogcare_field7 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field8"
            className="mb-2 font-medium"
          >
            Llegas a tu casa y encuentras tu ropa, calcetines y
            electrodomésticos inservibles: ¡TU PERRITO LAS DESPEDAZÓ!; ¿Qué
            harías en ese momento?
          </label>
          <textarea
            id="sobre_el_cuidado.dogcare_field8"
            name="sobre_el_cuidado.dogcare_field8"
            value={formData.sobre_el_cuidado.dogcare_field8 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="sobre_el_cuidado.dogcare_field9"
            className="mb-2 font-medium"
          >
            Cuándo no estes en casa (Trabajo, escuela), ¿En donde se quedará el
            perrito? ¿Con quién se quedaría?
          </label>
          <textarea
            id="sobre_el_cuidado.dogcare_field9"
            name="sobre_el_cuidado.dogcare_field9"
            value={formData.sobre_el_cuidado.dogcare_field9 || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}
