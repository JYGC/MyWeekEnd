import { Preferences } from '@capacitor/preferences';
import type { ITodoDTO } from '../dtos/todos';
import { v4 as uuidv4 } from 'uuid';

export const todoKeyWord = 'todo';

export const newTodoDTO = (title: string, description: string): ITodoDTO => ({
  _id: `${todoKeyWord}/${uuidv4()}`,
  title: title,
  description: description,
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
  const todos = [];
  for (let i = 0; i < keys.length; i++) {
    const todoJson = (await Preferences.get({ key: keys[i] })).value;
    const todo: ITodoDTO = todoJson === null ? { _id: keys[i] } : JSON.parse(todoJson);
    todos.push(todo);
  }
  return sortByProperty(todos, t => t.description);
};

const sortByProperty = <T,>(array: T[], getPropertyToSortByFunction: (element: T) => any): T[] => {
  return array.sort((a: T, b: T) => {
    const aProperty = getPropertyToSortByFunction(a);
    const bProperty = getPropertyToSortByFunction(b);
    if (aProperty < bProperty) return -1;
    if (aProperty > bProperty) return 1;
    return 0;
  });
}