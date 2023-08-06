import { v4 as uuidv4 } from 'uuid';

export interface ITodoDTO {
  _id: string;
  title: string;
  body: string;
  completed: boolean;
}

export const newTodoDTO = (title: string, body: string): ITodoDTO => ({
  _id: uuidv4(),
  title: title,
  body: body,
  completed: false
});