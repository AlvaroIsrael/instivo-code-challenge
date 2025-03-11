import CreateUserService from '@modules/users/services/CreateUser.service';
import { HttpStatusCode } from 'axios';
import { instanceToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(HttpStatusCode.Ok).json(instanceToInstance(user));
  }
}

export default UsersController;
