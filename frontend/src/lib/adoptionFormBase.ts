import type { FormularioAdopcion } from '@/api/types.gen';
import { getFormCache, setFormCache } from './formCache';

export const initialAdoptionFormState: FormularioAdopcion = {
  datos_del_animal: {
    dog_id: 0,
  },
  datos_del_solicitante: {
    adpt_name: '',
    adpt_age: 0,
    adpt_address: '',
    adpt_form_field1: null,
    adpt_form_field2: null,
    adpt_form_field3: null,
    adpt_form_field4: null,
    adpt_form_field5: null,
    adpt_form_field6: null,
    adpt_form_field7: false,
    adpt_form_field8: null,
  },
  sobre_el_espacio: {
    living_form_field1: null,
    living_form_field3: null,
    living_form_field4: null,
    living_form_field5: null,
    living_form_field6: null,
    living_form_field7: null,
    living_form_field8: null,
    living_form_field9: null,
    living_form_field10: null,
    living_form_field11: null,
  },
  sobre_el_cuidado: {
    dogcare_field1: null,
    dogcare_field2: null,
    dogcare_field3: null,
    dogcare_field4: null,
    dogcare_field5: null,
    dogcare_field6: null,
    dogcare_field7: null,
    dogcare_field8: null,
    dogcare_field9: null,
  },
};

export const getAdoptionFormBase = async (): Promise<FormularioAdopcion> => {
  const cachedData = getFormCache();
  if (cachedData) {
    return Promise.resolve(JSON.parse(JSON.stringify(cachedData)));
  }


  const formData = JSON.parse(JSON.stringify(initialAdoptionFormState));
  setFormCache(formData);

  return formData;
};

