import type { FormularioAdopcion } from "@/api/types.gen";
import CustomCheckbox from '../CustomCheckbox';

interface SectionProps {
  formData: FormularioAdopcion;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        {/* Nombre completo */}
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
            value={formData.datos_del_solicitante.adpt_name || ""}
            onChange={handleChange}
            className="p-2 border-2 rounded"
            required
          />
        </div>

        {/* Edad */}
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
            value={formData.datos_del_solicitante.adpt_age || ""}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* Domicilio */}
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
            value={formData.datos_del_solicitante.adpt_address || ""}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* Transporte cercano */}
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field1"
            className="mb-2 font-medium"
          >
            ¿Hay algún Autobús/metro cercano a tu casa?
          </label>
          <select
            id="datos_del_solicitante.adpt_form_field1"
            name="datos_del_solicitante.adpt_form_field1"
            value={formData.datos_del_solicitante.adpt_form_field1 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Numero de celular */}
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field2"
            className="mb-2 font-medium"
          >
            Número de celular
          </label>
          <input
            type="tel"
            id="datos_del_solicitante.adpt_form_field2"
            name="datos_del_solicitante.adpt_form_field2"
            value={formData.datos_del_solicitante.adpt_form_field2 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
            pattern="[0-9]{10}"
            title="El número de celular debe contener 10 dígitos."
            required
          />
        </div>

        {/* Numero de emergencia */}
        <div className="flex flex-col">
          <label
            htmlFor="datos_del_solicitante.adpt_form_field3"
            className="mb-2 font-medium"
          >
            Número de emergencia / Respaldo
          </label>
          <input
            type="tel"
            id="datos_del_solicitante.adpt_form_field3"
            name="datos_del_solicitante.adpt_form_field3"
            value={formData.datos_del_solicitante.adpt_form_field3 || ""}
            onChange={handleChange}
            className="p-2 border rounded"
            pattern="[0-9]{10}"
            title="El número de emergencia debe contener 10 dígitos."
            required
          />
        </div>

        {/* Horario de contacto */}
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
            required
          />
        </div>

        {/* Correo electronico */}
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
            required
          />
        </div>

        {/* Ocupacion */}
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
            required
          />
        </div>

        {/* Seguimiento */}
        <CustomCheckbox
          id="datos_del_solicitante.adpt_form_field7"
          name="datos_del_solicitante.adpt_form_field7"
          checked={formData.datos_del_solicitante.adpt_form_field7 === true}
          onChange={handleChange}
          label="¿Estás de acuerdo en que se dé seguimiento a esta adopción?"
        />

        {/* Si no esta de acuerdo */}
        {formData.datos_del_solicitante.adpt_form_field7 !== true && (
          <div className="flex flex-col">
            <label
              htmlFor="datos_del_solicitante.adpt_form_field8"
              className="mb-2 font-medium"
            >
              Si no, ¿Por qué?
            </label>
            <textarea
              id="datos_del_solicitante.adopt_form_field8"
              name="datos_del_solicitante.adopt_form_field8"
              value={formData.datos_del_solicitante.adpt_form_field8 || ""}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
