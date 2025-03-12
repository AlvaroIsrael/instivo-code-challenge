import 'reflect-metadata';

import { UserModel } from '@entities/User.entity';
import FakeHashProvider from '@modules/users/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUser.service';
import UsersRepository from '@repositories/Users.repository';

let usersRepository: UsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      usersRepository,
      fakeHashProvider,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Não deve ser capaz de criar um usuário com e-mail que já existe.', async () => {
    const existingUser = new UserModel({
      name: 'Jhon Doe',
      email: 'jhondoe1@example.com',
      password: 'E9334650C128',
    });

    const findByEmailSpy = jest
      .spyOn(usersRepository, 'findByEmail')
      .mockResolvedValue(existingUser);

    try {
      await createUserService.execute({
        name: 'Jhon Doe 2',
        email: 'jhondoe1@example.com',
        password: '8DE0A7A43771',
      });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('Email already used.');
    }

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith('jhondoe1@example.com');
  });

  test('Deve ser capaz de criar um novo usuário.', async () => {
    const newUser = new UserModel({
      name: 'Jhon Doe',
      email: 'jhondoe1@example.com',
      password: 'E9334650C128',
    });

    const findByEmailSpy = jest
      .spyOn(usersRepository, 'findByEmail')
      .mockResolvedValue(null);

    const createSpy = jest
      .spyOn(usersRepository, 'create')
      .mockImplementation(async () => newUser);

    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'E9334650C128',
    });

    expect(user).toBe(newUser);
    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
