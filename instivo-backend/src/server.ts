import 'reflect-metadata';
import path from 'path';
import { errors } from 'celebrate';
// import cors from 'cors';
import 'express-async-errors';
import logger from 'debug';
import dotenv from 'dotenv';
import yaml from 'yamljs';

const swagger = yaml.load('src/@documentaion/swagger.yaml');
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

import '@shared/container';
import { errorHandlerMiddleware } from '@middlewares/errorHandler.middleware';
import calculationsRouter from '@modules/calculations/calculations.routes';
import usersRouter from '@modules/users/users.routes';
import { closeConnection, openConnection } from '@shared/database/dataSource';

openConnection()
  .then(() => {
    logger.log('✅ Database initialized ✅');

    const server: Express = express();

    // server.use(
    //   cors({
    //     origin: process.env.FRONTEND_URL || '*',
    //     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    //     credentials: true,
    //   }),
    // );

    server.use(express.json());
    server.use('/v1', usersRouter);
    server.use('/v1', calculationsRouter);
    server.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swagger));
    server.use(errors());
    server.use(errorHandlerMiddleware);

    server.listen(3333, () => {
      logger.log('🔥 Server is running at http://localhost:3333 🔥');
    });
  })
  .catch(async (err) => {
    logger.log(`💣 Error initializing the application 💥: ${err}`);
    await closeConnection();
    process.exit(1);
  });

process.on('SIGINT', async () => {
  logger.log('🏆 Gracefully shutting down the application 🏆!');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.log('🏆 Gracefully shutting down the application 🏆!');
  await closeConnection();
  process.exit(0);
});
