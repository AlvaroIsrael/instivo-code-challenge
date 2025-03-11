import 'reflect-metadata';
import CalculationService from '@modules/calculations/services/Calculations.service';
import UpdateCalculationsService from '@modules/calculations/services/UpdateCalculations.service';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let zipCodeService: ZipCodeService;
let calculationService: CalculationService;
let updateCalculationsService: UpdateCalculationsService;
let calculateRepository: ICalculationsRepository;

describe('UpdateCalculationsService', () => {
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
    updateCalculationsService = new UpdateCalculationsService(
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
    const id = '123';
    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '12345-678';

    jest.spyOn(calculateRepository, 'findById').mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    try {
      await updateCalculationsService.execute({
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
      },
    });

    const date = '2021-01-01';
    const salary = 1000;
    const zipCode = '11111-111';

    jest
      .spyOn(zipCodeService, 'getZipCodeData')
      .mockImplementationOnce(async () => {
        return {
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
        };
      });

    console.log('calculation.idUuid', calculation.idUuid);
    calculation.idUuid;
    const updatedCalculation = await updateCalculationsService.execute({
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
