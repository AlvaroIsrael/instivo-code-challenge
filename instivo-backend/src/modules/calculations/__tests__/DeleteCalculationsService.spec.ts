import 'reflect-metadata';
import DeleteCalculationsService from '@modules/calculations/services/DeleteCalculations.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { closeConnection, openConnection } from '@shared/database/dataSource';
import logger from 'debug';

let deleteCalculationsService: DeleteCalculationsService;
let calculateRepository: ICalculationsRepository;
describe('DeleteCalculationsService', () => {
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
    calculateRepository = new CalculationsRepository();
    deleteCalculationsService = new DeleteCalculationsService(
      calculateRepository,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeConnection();
  });

  test('Deve retornar erro 404 caso a calculação não exista', async () => {
    const id = 'que id é esse?';
    try {
      await deleteCalculationsService.execute({ id });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('Calculation not found');
    }
  });

  test('Deve deletar um cálculo', async () => {
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

    const deleteSpy = jest.spyOn(calculateRepository, 'delete');

    await deleteCalculationsService.execute({ id: calculation.idUuid });

    const calculationDeleted = await calculateRepository.findById(
      calculation.id,
    );

    expect(calculationDeleted).toBeNull();
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
