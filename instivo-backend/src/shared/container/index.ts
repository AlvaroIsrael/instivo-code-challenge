import BCryptHashProvider from '@providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@providers/HashProvider/interfaces/IHashProvider';
import UsersRepository from '@repositories/Users.repository';
import IUsersRepository from '@repositories/interfaces/IUsersRepository';
import { container } from 'tsyringe';

import CalculationsService from '@modules/calculations/services/Calculations.service';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ICalculationsRepository>(
  'CalculationsRepository',
  CalculationsRepository,
);

container.registerSingleton<CalculationsService>(
  'CalculationsService',
  CalculationsService,
);

container.registerSingleton<ZipCodeService>('ZipCodeService', ZipCodeService);
