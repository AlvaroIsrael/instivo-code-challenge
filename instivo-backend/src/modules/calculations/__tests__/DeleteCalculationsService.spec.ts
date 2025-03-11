import 'reflect-metadata';
import { CalculationModel } from '@entities/Calculation.entity';
import DeleteCalculationsService from '@modules/calculations/services/DeleteCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';

let deleteCalculationsService: DeleteCalculationsService;
let calculateRepository: ICalculationsRepository;

describe('DeleteCalculationsService', () => {
  beforeEach(() => {
    calculateRepository = new CalculationsRepository();
    deleteCalculationsService = new DeleteCalculationsService(
      calculateRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Deve retornar erro 404 caso a calculação não exista', async () => {
    const id = 'que id é esse?';

    jest.spyOn(calculateRepository, 'findById').mockResolvedValue(null);

    try {
      await deleteCalculationsService.execute({ id });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('Calculation not found');
    }
  });

  test('Deve deletar um cálculo', async () => {
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

    const findByIdSpy = jest
      .spyOn(calculateRepository, 'findById')
      .mockResolvedValue(foundCalculation);

    const deleteSpy = jest
      .spyOn(calculateRepository, 'delete')
      .mockResolvedValue();

    await deleteCalculationsService.execute({ id: foundCalculation.idUuid });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(foundCalculation.idUuid);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
