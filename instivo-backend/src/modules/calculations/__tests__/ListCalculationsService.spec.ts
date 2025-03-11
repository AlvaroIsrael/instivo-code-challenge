import 'reflect-metadata';

import ListCalculationsService from '@modules/calculations/services/ListCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let listCalculationsService: ListCalculationsService;
let calculationsRepository: ICalculationsRepository;
let calculationId = '';

describe('ListCalculationsService', () => {
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
    listCalculationsService = new ListCalculationsService(
      calculationsRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeConnection();
  });

  test('Deve retornar um array vazio se o repositório não encontrar cálculos', async () => {
    const { idUuid } = await calculationsRepository.create({
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

    calculationId = idUuid;

    const calculations = await listCalculationsService.execute({
      page: 1,
      limit: 10,
      filters: {
        idUuid: 'que id é esse?',
      },
    });

    expect(calculations).toEqual([]);
  });

  test('Deve retornar um array com todos os cálculos se nenhum filtro for' +
    ' informado', async () => {
    await calculationsRepository.delete(calculationId);

    const calculation = await calculationsRepository.create({
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

    const calculations = await listCalculationsService.execute({
      page: 1,
      limit: 10,
    });

    expect(calculations[0].idUuid).toEqual([calculation][0].idUuid);
    expect(calculations.length).toEqual([calculation].length);
  });
});
