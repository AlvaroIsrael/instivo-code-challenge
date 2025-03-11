import { ZipCodeData } from '@modules/zipCodes/services/ZipCode.service';
import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';

interface Calculation extends Document {
  idUuid: string;
  daysPassed: number;
  monthsPassed: number;
  yearsPassed: number;
  salaryPercentage: number;
  zipCodeData: ZipCodeData;
  createdAt: Date;
  updatedAt: Date;
}

const CalculationModel = mongoose.model(
  'calculations',
  new Schema<Calculation>({
    idUuid: String,
    daysPassed: Number,
    monthsPassed: Number,
    yearsPassed: Number,
    salaryPercentage: Number,
    zipCodeData: {
      cep: String,
      logradouro: String,
      complemento: String,
      unidade: String,
      bairro: String,
      localidade: String,
      uf: String,
      estado: String,
      regiao: String,
      ibge: String,
      gia: String,
      ddd: String,
      siafi: String,
    },
    createdAt: Date,
    updatedAt: Date,
  }),
);

export { CalculationModel, Calculation };
