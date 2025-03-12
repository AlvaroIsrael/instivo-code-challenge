import * as process from 'node:process';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const openConnection = async (): Promise<Connection> => {
  await mongoose.connect(String(process.env.MONGODB_URI));

  return mongoose.connection;
};

const closeConnection = async (): Promise<void> => {
  await mongoose.disconnect();
};

export { openConnection, closeConnection };
