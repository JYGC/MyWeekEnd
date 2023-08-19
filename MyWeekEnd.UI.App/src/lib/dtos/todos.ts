export interface ITodoDTO {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
}

export interface ITodoListDTO {
  id: number;
  name: string;
}

export interface ITodoDetailDTO {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
}