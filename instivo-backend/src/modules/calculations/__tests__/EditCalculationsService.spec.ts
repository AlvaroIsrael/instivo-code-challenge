import 'reflect-metadata';
import { CalculationModel } from '@entities/Calculation.entity';
import EditCalculationsService from '@modules/calculations/services/EditCalculations.service';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CalculationsRepository from '@repositories/Calculations.repository';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';

let zipCodeService: ZipCodeService;
let editCalculationsService: EditCalculationsService;
let calculateRepository: ICalculationsRepository;

describe('EditCalculationsService', () => {
  beforeEach(() => {
    zipCodeService = new ZipCodeService();
    calculateRepository = new CalculationsRepository();
    editCalculationsService = new EditCalculationsService(
      calculateRepository,
      zipCodeService,
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
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

    const date = '2021-01-01';
    const salary = 2000;
    const zipCode = '11111-111';

    const zipCodeServiceSpy = jest
      .spyOn(zipCodeService, 'getZipCodeData')
      .mockImplementationOnce(async () => {
        return Promise.resolve({
          cep: zipCode,
          logradouro: 'Rua Teste 2',
          complemento: 'Complemento Teste 2',
          unidade: 'Unidade Teste 2',
          bairro: 'Bairro Teste 2',
          localidade: 'Cidade Teste 2',
          uf: 'TS',
          estado: 'São Paulo',
          regiao: 'Sudeste',
          ibge: '1234562',
          gia: '1234562',
          ddd: '12',
          siafi: '1224',
        });
      });

    const saveSpy = jest
      .spyOn(calculateRepository, 'save')
      .mockImplementationOnce(async () => {
        return Promise.resolve(
          new CalculationModel({
            idUuid: 'fe0cadf7-c93e-4eee-b765-d358b4181e11',
            daysPassed: 1,
            monthsPassed: 1,
            salaryPercentage: salary * 0.35,
            yearsPassed: 1,
            zipCodeData: {
              cep: zipCode,
              logradouro: 'Rua Teste 2',
              complemento: 'Complemento Teste 2',
              unidade: 'Unidade Teste 2',
              bairro: 'Bairro Teste 2',
              localidade: 'Cidade Teste 2',
              uf: 'TS',
              estado: 'São Paulo',
              regiao: 'Sudeste',
              ibge: '1234562',
              gia: '1234562',
              ddd: '12',
              siafi: '1224',
            },
          }),
        );
      });

    const updatedCalculation = await editCalculationsService.execute({
      id: foundCalculation.idUuid,
      date,
      salary,
      zipCode,
    });

    expect(updatedCalculation).toHaveProperty('idUuid');
    expect(updatedCalculation).toHaveProperty('zipCodeData');
    expect(updatedCalculation.zipCodeData.cep).toBe('11111-111');
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(foundCalculation.idUuid);
    expect(zipCodeServiceSpy).toHaveBeenCalledTimes(1);
    expect(zipCodeServiceSpy).toHaveBeenCalledWith('11111111');
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });
});
