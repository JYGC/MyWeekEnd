import { v4 as uuidv4 } from 'uuid';
import { JsonDB, Config } from 'node-json-db';
import { newTodoDTO } from '../dtos/todo-dtos';

const database = new JsonDB(new Config('myDataBase', true, false, '/')); // CONTINUE: https://capacitorjs.com/docs/apis/filesystem

export const addStuff = async () => {
  const uuid = uuidv4();
  await database.push(`/test/asd/${uuid}`, newTodoDTO(uuid, '32f23ff3'));
};

export const getStuff = async () => {
  return await database.getData('/test/asd');
};