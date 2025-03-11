import 'reflect-metadata';
import CalculationService from '@modules/calculations/services/Calculations.service';
import EditCalculationsService from '@modules/calculations/services/EditCalculations.service';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let zipCodeService: ZipCodeService;
let calculationService: CalculationService;
let editCalculationsService: EditCalculationsService;
let calculateRepository: ICalculationsRepository;

describe('EditCalculationsService', () => {
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
    editCalculationsService = new EditCalculationsService(
      calculateRepository,
      calculationService,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeConnection();
  });

  test('Deve retornar erro 404 se não encontrar o cálculo.', async () => {
    const id = '10bcbb71-80be-4b35-83a9-ebfcf43a5af2';
    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '12345-678';

    jest.spyOn(calculateRepository, 'findById').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    try {
      await editCalculationsService.execute({
        id,
        date,
        salary,
        zipCode,
      });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('Calculation not found');
    }
  });

  test('Deve ser capaz de atualizar um cálculo.', async () => {
    const calculation = await calculateRepository.create({
      daysPassed: 1,
      monthsPassed: 1,
      salaryPercentage: 350,
      yearsPassed: 1,
      zipCodeData: {
        cep: '12345-500',
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
      },
    });

    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '11111-111';

    jest
      .spyOn(zipCodeService, 'getZipCodeData')
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          cep: zipCode,
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
        });
      });

    const updatedCalculation = await editCalculationsService.execute({
      id: calculation.idUuid,
      date,
      salary,
      zipCode,
    });

    expect(updatedCalculation).toHaveProperty('id');
    expect(updatedCalculation).toHaveProperty('zipCodeData');
    expect(updatedCalculation.zipCodeData.cep).toBe('11111-111');
  });
});
