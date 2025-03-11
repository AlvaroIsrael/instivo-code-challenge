import { ServiceUnavailableError } from '@shared/errors';
import axios from 'axios';
import logger from 'debug';
import { injectable } from 'tsyringe';

export type ZipCodeData = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

@injectable()
class ZipCodeService {
  public async getZipCodeData(zipCode: string): Promise<ZipCodeData> {
    // TODO: Avaliar implementar um cache para evitar chamadas desnecessárias
    let response;
    try {
      response = await axios.get<ZipCodeData>(
        `https://viacep.com.br/ws/${zipCode}/json/`,
      );
    } catch (error) {
      logger.log(`Error fetching zip code data: ${error}`);
      throw new ServiceUnavailableError('ZipCode service is unavailable');
    }

    return response.data;
  }
}

export default ZipCodeService;
