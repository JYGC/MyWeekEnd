import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DataSource, Repository } from 'typeorm';
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

    await testInsert(AppDataSource.getRepository(Todo));

    return [AppDataSource.isInitialized, null];
  } catch (error) {
    return [null, JSON.stringify({error, stack: error.stack})];
  }
};

const testInsert = async (repo: Repository<Todo>) => {
  const currentDate = new Date();

  const user = new Todo();
  user.name = 'dsfsdg fsdg';
  user.description = 'sgerterg ggds dhdsh dshd';
  user.createddate = currentDate.getTime();
  user.duedate = currentDate.setDate(currentDate.getDate() + 5);

  await repo.save(user);
};
