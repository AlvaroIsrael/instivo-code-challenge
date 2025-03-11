import 'reflect-metadata';
import CustomError from '@errors/Custom.error';
import FakeHashProvider from '@modules/users/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUser.service';
import UsersRepository from '@repositories/Users.repository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let usersRepository: UsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeAll(() => {
    openConnection()
      .then((connection) => {
        logger.log(`Database initialized: ${connection.readyState}`);
      })
      .catch((err) => {
        logger.log(`💣 Error initializing the application 💥: ${err}`);
      });
  });

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

  afterAll(async () => {
    await closeConnection();
  });

  test('Deve ser capaz de criar um novo usuário.', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'E9334650C128',
    });

    expect(user).toHaveProperty('id');
  });

  test('Não deve ser capaz de criar um usuário com e-mail que já existe.', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe1@example.com',
      password: 'E9334650C128',
    });

    try {
      await createUserService.execute({
        name: 'Jhon Doe 2',
        email: 'jhondoe1@example.com',
        password: '8DE0A7A43771',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
    }
  });
});
