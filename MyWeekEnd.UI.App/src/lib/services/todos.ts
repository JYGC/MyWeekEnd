import { Preferences } from '@capacitor/preferences';
import type { ITodoDTO, ITodoDetailDTO, ITodoListDTO } from '../dtos/todos';
import { runSqlQuery, sendSqlQuery } from '../database'; 
import { v4 as uuidv4 } from 'uuid';

export const todoKeyWord = 'todo';

export const newTodoDTO = (title: string, description: string): ITodoDTO => ({
  id: `${todoKeyWord}/${uuidv4()}`,
  title: title,
  description: description,
  createdDate: new Date(),
  dueDate: new Date()
});

export const newTodoDetailDTO = (
  name: string = '',
  description: string = '',
  dueDate: Date = new Date(),
  createdDate: Date = new Date(0)
) => ({
  id: -1,
  name,
  description,
  dueDate,
  createdDate
});

export const addTodo = async (newTodo: ITodoDTO) => {
  await Preferences.set({
    key: newTodo.id,
    value: JSON.stringify(newTodo),
  });
};

export const deleteTodo = async (todo: ITodoDTO) => {
  await Preferences.remove({ key: todo.id });
};

export const getAllTodos = async (): Promise<ITodoDTO[]> => {
  const keys = (await Preferences.keys()).keys.filter(k => k.startsWith(todoKeyWord));
  const todos = [];
  for (let i = 0; i < keys.length; i++) {
    const todoJson = (await Preferences.get({ key: keys[i] })).value;
    const todo: ITodoDTO = todoJson === null ? { id: keys[i] } : JSON.parse(todoJson);
    todos.push(todo);
  }
  return sortByProperty<ITodoDTO,string>(todos, t => t.description);
};

export const migrateTodos = async () => {
  const todos = await getAllTodos();
  for (let i = 0; i < todos.length; i++)
    addTodo2(newTodoDetailDTO(todos[i].title, todos[i].description, todos[i].dueDate, todos[i].createdDate));
};

export const addTodo2 = async (todoDetailDTO: ITodoDetailDTO) => {
  const insertTodoQuery =
  'INSERT INTO Todos(name, description, dueDate, createdDate) '
  + 'VALUES(?,?,?,?);';

  (await runSqlQuery(insertTodoQuery, [
    todoDetailDTO.name,
    todoDetailDTO.description,
    todoDetailDTO.dueDate.getTime(),
    todoDetailDTO.createdDate.getTime()
  ]));
};

export const updateTodo = async (todoDetailDTO: ITodoDetailDTO) => {
  const updateTodoQuery =
  'UPDATE Todos '
  + 'SET name = ?, description = ?, dueDate = ?, createdDate = ? '
  + 'WHERE id = ?;';
  
  (await sendSqlQuery(updateTodoQuery, [
    todoDetailDTO.name,
    todoDetailDTO.description,
    todoDetailDTO.dueDate.getTime(),
    todoDetailDTO.createdDate.getTime()
  ]));
};

export const deleteTodo2 = async (todoDTO: ITodoDetailDTO) => {
  const deleteTodoQuery =
  'DELETE FROM Todos '
  + 'WHERE id = ?';

  (await sendSqlQuery(deleteTodoQuery, [todoDTO.id]));
};

export const getTodoDetailDTO = async (todoListDTO: ITodoListDTO): Promise<ITodoDetailDTO> => {
  const getTodoListQuery =
  'SELECT id, name, description, dueDate, createdDate '
  + 'FROM Todos '
  + 'WHERE id = ?;';

  const sqlValues = (await sendSqlQuery(getTodoListQuery, [todoListDTO.id])).values;

  if (typeof sqlValues === 'undefined' || sqlValues === null)
    return {
      id: -1,
      name: '',
      description: '',
      dueDate: new Date(0),
      createdDate: new Date(0)
    };

  return sqlValues.map(t => {
    const todoDetailDTO: ITodoDetailDTO = {
      id: t.id,
      name: t.name,
      description: t.description,
      dueDate: t.dueDate,
      createdDate: t.createdDate
    };

    return todoDetailDTO;
  })[0];
};

export const getTodoList = async (): Promise<ITodoListDTO[]> => {
  const getTodoListQuery =
  'SELECT id, name '
  + 'FROM Todos;';
  
  const sqlValues = (await sendSqlQuery(getTodoListQuery)).values;

  if (typeof sqlValues === 'undefined' || sqlValues === null) return [];

  return sqlValues.map(t => {
    const todolistDTO: ITodoListDTO = {
      id: t.id.toString(),
      name: t.name,
    };

    return todolistDTO;
  });
};

const sortByProperty = <K,T>(array: K[], getPropertyToSortByFunction: (element: K) => T): K[] => {
  return array.sort((a: K, b: K) => {
    const aProperty = getPropertyToSortByFunction(a);
    const bProperty = getPropertyToSortByFunction(b);
    if (aProperty < bProperty) return -1;
    if (aProperty > bProperty) return 1;
    return 0;
  });
}