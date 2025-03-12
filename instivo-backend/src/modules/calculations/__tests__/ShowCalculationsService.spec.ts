import 'reflect-metadata';

import { CalculationModel } from '@entities/Calculation.entity';
import ShowCalculationsService from '@modules/calculations/services/ShowCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';

let showCalculationsService: ShowCalculationsService;
let calculationsRepository: ICalculationsRepository;

describe('ShowCalculationsService', () => {
  beforeEach(() => {
    calculationsRepository = new CalculationsRepository();
    showCalculationsService = new ShowCalculationsService(
      calculationsRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Deve retornar erro 404 se o repositório não encontrar nenhum cálculo', async () => {
    jest.spyOn(calculationsRepository, 'findOne').mockResolvedValue(null);

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

    const findOneSpy = jest
      .spyOn(calculationsRepository, 'findOne')
      .mockResolvedValue(foundCalculation);

    const calculation = await showCalculationsService.execute({
      id: foundCalculation.idUuid,
    });

    expect(foundCalculation).not.toBeNull();
    expect(foundCalculation.idUuid).toEqual(calculation?.idUuid);
    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({
      idUuid: foundCalculation.idUuid,
    });
  });
});
