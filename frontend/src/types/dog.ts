export enum DogStatus {
  Disponible = "Disponible",
  EnProceso = "En proceso",
  Adoptado = "Adoptado",
}

export interface Dog  {
  id: number;
  name: string;
  age: string;
  imageUrl: string;
  sex: string;
  size: string;
  tags: string[];
  description: string;
  status: DogStatus;
  refugeTime: string;

};


