import 'reflect-metadata';

import ShowCalculationsService from '@modules/calculations/services/ShowCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let showCalculationsService: ShowCalculationsService;
let calculationsRepository: ICalculationsRepository;

describe('ShowCalculationsService', () => {
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
    calculationsRepository = new CalculationsRepository();
    showCalculationsService = new ShowCalculationsService(
      calculationsRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeConnection();
  });

  test('Deve retornar erro 404 se o repositório não encontrar nenhum cálculo', async () => {
    await calculationsRepository.create({
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

    try {
      await showCalculationsService.execute({
        id: 'que id é esse?',
      });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('Calculation not found');
    }
  });

  test('Deve retornar um cálculo se o id existir no banco', async () => {
    const calculation = await calculationsRepository.create({
      daysPassed: 1,
      monthsPassed: 1,
      salaryPercentage: 350,
      yearsPassed: 1,
      zipCodeData: {
        cep: '12345-699',
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

    const foundCalculation = await showCalculationsService.execute({
      id: calculation.idUuid,
    });

    expect(foundCalculation).not.toBeNull();
    expect(foundCalculation?.idUuid).toEqual(calculation.idUuid);
  });
});
