import { Preferences } from '@capacitor/preferences';
import type { ITodoListDTO } from '../dtos/todos';
import { v4 as uuidv4 } from 'uuid';

export const todoKeyWord = 'todo';

export const newTodoDTO = (title: string, description: string): ITodoListDTO => ({
  id: `${todoKeyWord}/${uuidv4()}`,
  title: title,
  description: description,
  completed: false
});

export const addTodo = async (newTodo: ITodoListDTO) => {
  await Preferences.set({
    key: newTodo.id,
    value: JSON.stringify(newTodo),
  });
};

export const deleteTodo = async (todo: ITodoListDTO) => {
  await Preferences.remove({ key: todo.id });
};

export const getAllTodos = async (): Promise<ITodoListDTO[]> => {
  const keys = (await Preferences.keys()).keys.filter(k => k.startsWith(todoKeyWord));
  const todos = [];
  for (let i = 0; i < keys.length; i++) {
    const todoJson = (await Preferences.get({ key: keys[i] })).value;
    const todo: ITodoListDTO = todoJson === null ? { id: keys[i] } : JSON.parse(todoJson);
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