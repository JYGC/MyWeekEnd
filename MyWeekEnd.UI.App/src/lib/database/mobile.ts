import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';

export const initDatabase = async () => {
  try {
    const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
    
    const AppDataSource = new DataSource({
      type: 'capacitor',
      driver: sqliteConnection,
      database: 'inijhoi'
    });

    await AppDataSource.initialize();

    return [AppDataSource.isInitialized, null];
  } catch (error) {
    return [null, error];
  }
};