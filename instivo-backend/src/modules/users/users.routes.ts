import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';

import UsersController from '@modules/users/users.controller';
import { ensureAuthenticationMiddleware } from '@shared/middlewares/ensureAuthentication.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/users',
  ensureAuthenticationMiddleware,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
