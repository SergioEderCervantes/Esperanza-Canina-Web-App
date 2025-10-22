import type { FormularioAdopcion } from '@/api/types.gen';

let formCache: FormularioAdopcion | null = null;

export const getFormCache = () => formCache;

export const setFormCache = (data: FormularioAdopcion) => {
  formCache = data;
};