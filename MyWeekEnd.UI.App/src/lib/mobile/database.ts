import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';
import { Todo } from './entities';

export const initDatabase = async () => {
  try {
    const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
    
    const AppDataSource = new DataSource({
      type: 'capacitor',
      driver: sqliteConnection,
      database: 'MyWeekEnd',
      entities: [Todo]
    });

    await AppDataSource.initialize();

    return [AppDataSource.isInitialized, null];
  } catch (error) {
    return [null, error];
  }
};