import 'reflect-metadata';

import { CalculationModel } from '@entities/Calculation.entity';
import ListCalculationsService from '@modules/calculations/services/ListCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';

let listCalculationsService: ListCalculationsService;
let calculationsRepository: ICalculationsRepository;

describe('ListCalculationsService', () => {
  beforeEach(() => {
    calculationsRepository = new CalculationsRepository();
    listCalculationsService = new ListCalculationsService(
      calculationsRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Deve retornar um array vazio se o repositório não encontrar cálculos', async () => {
    const findAllSpy = jest
      .spyOn(calculationsRepository, 'findAll')
      .mockResolvedValue([]);

    const calculations = await listCalculationsService.execute({
      page: 1,
      limit: 10,
      filters: {
        idUuid: 'que id é esse?',
      },
    });

    expect(calculations).toEqual([]);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith(
      { idUuid: 'que id é esse?' },
      1,
      10,
    );
  });

  test('Deve retornar um array com todos os cálculos se nenhum filtro for' +
    ' informado', async () => {
    const foundCalculation = new CalculationModel({
      idUuid: 'b02e87ca-0a83-4c95-ba4f-b260aa557ab2',
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

    const findAllSpy = jest
      .spyOn(calculationsRepository, 'findAll')
      .mockResolvedValue([foundCalculation]);

    const calculations = await listCalculationsService.execute({
      page: 1,
      limit: 10,
    });

    expect(calculations[0].idUuid).toEqual([foundCalculation][0].idUuid);
    expect(calculations.length).toEqual([foundCalculation].length);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledWith({}, 1, 10);
  });
});
