import type { IDatabaseCollection } from './interfaces';
import type { ITodoDTO } from '../dtos/todo-dtos';

interface ICollectionAccessor {
  Todos: ITodoDTO[];
}

const memoryStorage: ICollectionAccessor = {
  Todos: [] 
}

class TodoCollection implements IDatabaseCollection<ITodoDTO> {
  private __storageObj: ICollectionAccessor;

  constructor(storageObj: ICollectionAccessor) {
    this.__storageObj = storageObj
  }

  public add(items: ITodoDTO[]): boolean {
    try {
      this.__storageObj.Todos = this.__storageObj.Todos.concat(items);
      return true;
    } catch (error) {
      return false;
    }
  }

  public get(conditions: { _id: String }): ITodoDTO[] {
    if (conditions === null)
      return this.__storageObj.Todos;
    return this.__storageObj.Todos.filter(t => t._id === conditions._id);
  }
  
  public update(items: ITodoDTO[]): boolean {
    for (let i = 0; i < items.length; i++) {
      const index = this.__storageObj.Todos.findIndex(t => t._id === items[i]._id);
      this.__storageObj.Todos[index].title = items[i].title;
      this.__storageObj.Todos[index].body = items[i].body;
      this.__storageObj.Todos[index].completed = items[i].completed;
    }
    return true;
  }
  
  public delete(conditions: { _id: String }): boolean {
    const index = this.__storageObj.Todos.findIndex(t => t._id === conditions._id);
    this.__storageObj.Todos.splice(index, 1);
    return true;
  }
}

export const getTodoCollection = () => new TodoCollection(memoryStorage);