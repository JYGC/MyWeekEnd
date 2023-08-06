import { getTodoCollection } from '../data/database';
import type { ITodoDTO } from '../dtos/todo-dtos';

const todoCollection = getTodoCollection();

export const addTodo = async (newTodo: ITodoDTO) => {
  await todoCollection.add([newTodo]);
};

export const deleteTodo = async (todo: ITodoDTO) => {
  await todoCollection.delete({
    _id: todo._id
  })
};

export const getTodos = async (): Promise<ITodoDTO[]> => {
  return await todoCollection.get(null);
};