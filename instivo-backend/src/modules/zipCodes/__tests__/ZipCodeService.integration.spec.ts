import 'reflect-metadata';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';

let zipCodeService: ZipCodeService;

describe('ZipCodeService.integration', () => {
  beforeEach(() => {
    zipCodeService = new ZipCodeService();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('Deve retornar os dados para um cep válido.', async () => {
    const zipCode = '01001000';

    const zipCodeData = await zipCodeService.getZipCodeData(zipCode);

    expect(zipCodeData).toEqual({
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      estado: 'São Paulo',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      regiao: 'Sudeste',
      uf: 'SP',
      unidade: '',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    });
  });
});
