import { Preferences } from '@capacitor/preferences';
import { type ITodoDTO } from '../dtos/todo-dtos';
import { v4 as uuidv4 } from 'uuid';

export const todoKeyWord = 'todo';

export const newTodoDTO = (title: string, body: string): ITodoDTO => ({
  _id: `${todoKeyWord}/${uuidv4()}`,
  title: title,
  body: body,
  completed: false
});

export const addTodo = async (newTodo: ITodoDTO) => {
  await Preferences.set({
    key: newTodo._id,
    value: JSON.stringify(newTodo),
  });
};

export const deleteTodo = async (todo: ITodoDTO) => {
  await Preferences.remove({ key: todo._id });
};

export const getAllTodos = async (): Promise<ITodoDTO[]> => {
  const keys = (await Preferences.keys()).keys.filter(k => k.startsWith(todoKeyWord));
  let todos = [];
  for (let i = 0; i < keys.length; i++) {
    const todo: ITodoDTO = JSON.parse((await Preferences.get({ key: keys[i] })).value);
    todos.push(todo);
  }
  return todos;
};