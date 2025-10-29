import type { FormularioAdopcion } from '@/api/types.gen';
import CustomCheckbox from '../CustomCheckbox';
interface SectionProps {
  formData: FormularioAdopcion;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function SobreElEspacioSection({ formData, handleChange }: SectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">Sobre el Espacio donde Vivirá</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="sobre_el_espacio.living_form_field1" className="mb-2 font-medium">¿Tu familia está de acuerdo con esta adopción? ¿Qué comentarios han hecho al respecto?</label>
          <textarea
            id="sobre_el_espacio.living_form_field1"
            name="sobre_el_espacio.living_form_field1"
            value={formData.sobre_el_espacio.living_form_field1 || ''}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>





        <CustomCheckbox
          id="sobre_el_espacio.living_form_field3"
          name="sobre_el_espacio.living_form_field3"
          checked={formData.sobre_el_espacio.living_form_field3 || false}
          onChange={handleChange}
          label="¿Tienes otras mascotas en casa?"
        />

        {formData.sobre_el_espacio.living_form_field3 && (
          <>
            <div className="flex flex-col">
              <label htmlFor="sobre_el_espacio.living_form_field4" className="mb-2 font-medium">¿Cuáles?</label>
              <input
                type="text"
                id="sobre_el_espacio.living_form_field4"
                name="sobre_el_espacio.living_form_field4"
                value={formData.sobre_el_espacio.living_form_field4 || ''}
                onChange={handleChange}
                className="p-2 border-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="sobre_el_espacio.living_form_field5" className="mb-2 font-medium">¿Qué servicios y cuidados les das?</label>
              <input
                type="text"
                id="sobre_el_espacio.living_form_field5"
                name="sobre_el_espacio.living_form_field5"
                value={formData.sobre_el_espacio.living_form_field5 || ''}
                onChange={handleChange}
                className="p-2 border-2 rounded"
              />
            </div>
            <CustomCheckbox
              id="sobre_el_espacio.living_form_field6"
              name="sobre_el_espacio.living_form_field6"
              checked={formData.sobre_el_espacio.living_form_field6 || false}
              onChange={handleChange}
              label="¿Están esterilizados?"
            />
            {formData.sobre_el_espacio.living_form_field6 !== true && (
              <div className="flex flex-col">
                <label htmlFor="sobre_el_espacio.living_form_field7" className="mb-2 font-medium">Si no, ¿por qué?</label>
                <input
                  type="text"
                  id="sobre_el_espacio.living_form_field7"
                  name="sobre_el_espacio.living_form_field7"
                  value={formData.sobre_el_espacio.living_form_field7 || ''}
                  onChange={handleChange}
                  className="p-2 border-2 rounded"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="sobre_el_espacio.living_form_field8" className="mb-2 font-medium">¿En qué parte duermen?</label>
              <input
                type="text"
                id="sobre_el_espacio.living_form_field8"
                name="sobre_el_espacio.living_form_field8"
                value={formData.sobre_el_espacio.living_form_field8 || ''}
                onChange={handleChange}
                className="p-2 border-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sobre_el_espacio.living_form_field9" className="mb-2 font-medium">¿Quién es el responsable de ellos?</label>
              <input
                type="text"
                id="sobre_el_espacio.living_form_field9"
                name="sobre_el_espacio.living_form_field9"
                value={formData.sobre_el_espacio.living_form_field9 || ''}
                onChange={handleChange}
                className="p-2 border-2 rounded"
              />
            </div>
          </>
        )}



        <div className="flex flex-col">
          <label htmlFor="sobre_el_espacio.living_form_field10" className="mb-2 font-medium">¿Vives en casa propia o rentada?</label>
          <input
            type="text"
            id="sobre_el_espacio.living_form_field10"
            name="sobre_el_espacio.living_form_field10"
            value={formData.sobre_el_espacio.living_form_field10 || ''}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="sobre_el_espacio.living_form_field11" className="mb-2 font-medium">¿Qué pasaría con el perrito si tienes que cambiarte de casa o país?</label>
          <textarea
            id="sobre_el_espacio.living_form_field11"
            name="sobre_el_espacio.living_form_field11"
            value={formData.sobre_el_espacio.living_form_field11 || ''}
            onChange={handleChange}
            className="p-2 border-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}