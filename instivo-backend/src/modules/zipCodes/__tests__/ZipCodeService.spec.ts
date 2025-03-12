import 'reflect-metadata';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
import CustomError from '@shared/errors/Custom.error';
import axios from 'axios';
import logger from 'debug';

let zipCodeService: ZipCodeService;

describe('ZipCodeService', () => {
  beforeEach(() => {
    zipCodeService = new ZipCodeService();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Deve retornar erro 503 caso a api viacep falhe.', async () => {
    const zipCode = '00000000';

    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Some random error'));
    jest.spyOn(logger, 'log');

    try {
      await zipCodeService.getZipCodeData(zipCode);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('ZipCode service is unavailable');
      // @ts-ignore
      expect(error).toBeInstanceOf(CustomError);
    }
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar os dados para um cep válido.', async () => {
    const zipCode = '01001000';

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107',
      },
    });

    const zipCodeData = await zipCodeService.getZipCodeData(zipCode);

    expect(zipCodeData).toEqual({
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    });
  });
});
