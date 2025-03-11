import * as process from 'node:process';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Connection, Mongoose } from 'mongoose';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

let dataSource: Mongoose;

const openConnection = async (): Promise<Connection> => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    if (process.env.NODE_ENV === 'testing') {
      await mongoose.connection.db?.dropDatabase();
    }
    return mongoose.connection;
  }

  if (process.env.NODE_ENV === 'testing') {
    dataSource = await mongoose.connect(String(process.env.MONGODB_TEST_URI));
    await dataSource.connection.db?.dropDatabase();
    return dataSource.connection;
  }

  dataSource = await mongoose.connect(String(process.env.MONGODB_URI));

  return dataSource.connection;
};

const closeConnection = async (): Promise<void> => {
  if (dataSource.connection.readyState === 1) {
    await dataSource.connection.close();
  }
};

export { openConnection, closeConnection, dataSource };
