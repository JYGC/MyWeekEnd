import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const databaseName = 'MyWeekEnd.db';

let databaseConnection: SQLiteDBConnection;

const initDatabaseAdapter = async () => {
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  const database = await sqlite.createConnection(
    databaseName, false, '', 0, false);
  await database.open();
  return database;
};

const initSchema = async (database: SQLiteDBConnection) => {
  const createTodosTableQuery =
    'CREATE TABLE IF NOT EXISTS Todos ('
    + 'id INTEGER NOT NULL PRIMARY KEY, '
    + 'name TEXT NOT NULL, '
    + 'description TEXT NOT NULL, '
    + 'dueDate INTEGER NOT NULL, '
    + 'createdDate INTEGER NOT NULL);';

  await database.execute(createTodosTableQuery);
};

export const establishDatabase = async () => {
  databaseConnection = await initDatabaseAdapter();
  await initSchema(databaseConnection);
}

// (async () => {
//   databaseConnection = await initDatabaseAdapter();
//   await initSchema(databaseConnection);
// })();

export const sendSqlQuery = async (statement: string, params: Array<string|number> = []) =>
  await databaseConnection.query(statement, params);

export const runSqlQuery = async (statement: string, params: Array<string|number> = []) =>
  await databaseConnection.run(statement, params);
