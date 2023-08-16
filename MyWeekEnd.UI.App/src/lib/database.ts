import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

class DatabaseAdapter {
  private readonly __databaseName = 'MyWeekEnd.db';

  private __database: SQLiteDBConnection | null;

  constructor () {
    this.__database = null;
  }

  public initDatabase = async () => {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    this.__database = await sqlite.createConnection(
      this.__databaseName, false, '', 0, false)

    await this.__database.open();
    
    await this.__initSchema();
  };

  private __initSchema = async () => {
    if (this.__database === null) throw new Error('Database is not initialized yet.');

    const createTodosTableQuery =
      'CREATE TABLE IF NOT EXISTS Todos ('
      + 'id INTEGER NOT NULL PRIMARY KEY, '
      + 'name TEXT NOT NULL, '
      + 'description TEXT NOT NULL, '
      + 'due_date INTEGER NOT NULL, '
      + 'created_date INTEGER NOT NULL);';

    await this.query(createTodosTableQuery);
  };

  public query = async (createTableQuery: string, params = []) => {
    if (this.__database === null) throw new Error('Database is not initialized yet.');
    return this.__database.query(createTableQuery, params);
  };
}

const databaseAdapter = new DatabaseAdapter();
databaseAdapter.initDatabase();

export const getDatabaseAdapter = () => databaseAdapter;