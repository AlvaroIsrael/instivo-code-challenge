import 'reflect-metadata';
import { CalculationModel } from '@entities/Calculation.entity';
import CalculationService from '@modules/calculations/services/Calculations.service';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let zipCodeService: ZipCodeService;
let calculationService: CalculationService;
let calculateRepository: ICalculationsRepository;
describe('CalculationsService', () => {
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
    zipCodeService = new ZipCodeService();
    calculateRepository = new CalculationsRepository();
    calculationService = new CalculationService(
      zipCodeService,
      calculateRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeConnection();
  });

  test('Não deve criar um cálculo novo se a api de cep falhar.', async () => {
    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '12345-678';

    jest.spyOn(zipCodeService, 'getZipCodeData').mockImplementationOnce(() => {
      throw new Error('Error');
    });

    const createSpy = jest.spyOn(calculateRepository, 'create');

    await expect(
      calculationService.execute({
        date,
        salary,
        zipCode,
      }),
    ).rejects.toThrow('Error');

    expect(createSpy).not.toHaveBeenCalled();
  });

  test('Deve ser capaz de chamar a api de cep corretamente.', async () => {
    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '12345-678';

    const zipCodeServiceSpy = jest
      .spyOn(zipCodeService, 'getZipCodeData')
      .mockImplementationOnce(async () => {
        return {
          cep: '12345-678',
          logradouro: 'Rua Teste',
          complemento: 'Complemento Teste',
          unidade: 'Unidade Teste',
          bairro: 'Bairro Teste',
          localidade: 'Cidade Teste',
          uf: 'TS',
          estado: 'São Paulo',
          regiao: 'Sudeste',
          ibge: '1234567',
          gia: '1234567',
          ddd: '11',
          siafi: '1234',
        };
      });

    jest
      .spyOn(calculateRepository, 'create')
      .mockImplementationOnce(async () => {
        const calculation = new CalculationModel({
          idUuid: 'aacc6fbd-ef7c-47c4-87b2-da2c05506d4c',
          daysPassed: 1,
          monthsPassed: 1,
          yearsPassed: 1,
          salaryPercentage: 350,
        });
        return Promise.resolve(calculation);
      });

    await calculationService.execute({
      date,
      salary,
      zipCode,
    });

    expect(zipCodeServiceSpy).toHaveBeenCalledTimes(1);
  });

  test('Deve ser capaz de fazer um cálculo corretamente.', async () => {
    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '12345-678';

    const zipCodeServiceSpy = jest
      .spyOn(zipCodeService, 'getZipCodeData')
      .mockImplementationOnce(async () => {
        return {
          cep: '12345-678',
          logradouro: 'Rua Teste',
          complemento: 'Complemento Teste',
          unidade: 'Unidade Teste',
          bairro: 'Bairro Teste',
          localidade: 'Cidade Teste',
          uf: 'TS',
          estado: 'São Paulo',
          regiao: 'Sudeste',
          ibge: '1234567',
          gia: '1234567',
          ddd: '11',
          siafi: '1234',
        };
      });

    const calculationSpy = jest
      .spyOn(calculateRepository, 'create')
      .mockImplementationOnce(async () => {
        const calculation = new CalculationModel({
          idUuid: 'aacc6fbd-ef7c-47c4-87b2-da2c05506d4c',
          daysPassed: 1,
          monthsPassed: 1,
          yearsPassed: 1,
          salaryPercentage: 350,
        });
        return Promise.resolve(calculation);
      });

    const { idUuid } = await calculationService.execute({
      date,
      salary,
      zipCode,
    });

    expect(zipCodeServiceSpy).toHaveBeenCalledTimes(1);
    expect(calculationSpy).toHaveBeenCalledTimes(1);
    expect(idUuid).toBe('aacc6fbd-ef7c-47c4-87b2-da2c05506d4c');
  });
});
