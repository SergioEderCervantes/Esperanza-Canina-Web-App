import type { FormularioAdopcion } from "@/api/types.gen";

interface SectionProps {
  formData: FormularioAdopcion;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function DatosDelSolicitanteSection({
  formData,
  handleChange,
}: SectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">
        Datos del Solicitante
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_name"
            className="mb-2 font-medium"
          >
            Nombre completo
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_name"
            name="datos_del_solicitante.adpt_name"
            className="p-2 border-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_age"
            className="mb-2 font-medium"
          >
            Edad del adoptante
          </label>
          <input
            type="number"
            id="datos_del_solicitante.adpt_age"
            name="datos_del_solicitante.adpt_age"
            value={formData.datos_del_solicitante.adpt_age}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_address"
            className="mb-2 font-medium"
          >
            Domicilio del adoptante
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_address"
            name="datos_del_solicitante.adpt_address"
            value={formData.datos_del_solicitante.adpt_address}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field1"
            className="mb-2 font-medium"
          >
            ¿Hay algún Autobús/metro cercano a tu casa?
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_form_field1"
            name="datos_del_solicitante.adpt_form_field1"
            value={formData.datos_del_solicitante.adpt_form_field1 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field2"
            className="mb-2 font-medium"
          >
            Numero de celular
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_form_field2"
            name="datos_del_solicitante.adpt_form_field2"
            value={formData.datos_del_solicitante.adpt_form_field2 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field3"
            className="mb-2 font-medium"
          >
            Numero de emergencia/Respaldo
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_form_field3"
            name="datos_del_solicitante.adpt_form_field3"
            value={formData.datos_del_solicitante.adpt_form_field3 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field4"
            className="mb-2 font-medium"
          >
            ¿Horario en el cual te podríamos contactar?
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_form_field4"
            name="datos_del_solicitante.adpt_form_field4"
            value={formData.datos_del_solicitante.adpt_form_field4 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field5"
            className="mb-2 font-medium"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="datos_del_solicitante.adpt_form_field5"
            name="datos_del_solicitante.adpt_form_field5"
            value={formData.datos_del_solicitante.adpt_form_field5 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field6"
            className="mb-2 font-medium"
          >
            Ocupación
          </label>
          <input
            type="text"
            id="datos_del_solicitante.adpt_form_field6"
            name="datos_del_solicitante.adpt_form_field6"
            value={formData.datos_del_solicitante.adpt_form_field6 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="datos_del_solicitante.adpt_form_field7"
            name="datos_del_solicitante.adpt_form_field7"
            checked={formData.datos_del_solicitante.adpt_form_field7 || false}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="datos_del_solicitante.adpt_form_field7"
            className="ml-2 block text-sm text-gray-900"
          >
            ¿Estás de acuerdo en que se dé seguimiento a esta adopción?
          </label>
        </div>
        {formData.datos_del_solicitante.adpt_form_field7 !== true && (
          <div className="flex flex-col">
            <label
              htmlFor="datos_del_solicitante.adopt_form_field8"
              className="mb-2 font-medium"
            >
              Si no, ¿Porqué?
            </label>
            <textarea
              id="datos_del_solicitante.adopt_form_field8"
              name="datos_del_solicitante.adopt_form_field8"
              value={formData.datos_del_solicitante.adopt_form_field8 || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
