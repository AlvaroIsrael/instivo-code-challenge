export   type ZipCodeData = {
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

export type IApiResponse = {
  idUuid: string;
  daysPassed: number;
  monthsPassed: number;
  yearsPassed: number;
  salaryPercentage: number;
  zipCodeData: ZipCodeData;
  error?: boolean;
};
