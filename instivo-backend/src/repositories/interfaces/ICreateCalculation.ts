import { ZipCodeData } from '@modules/zipCodes/services/ZipCode.service';

export default interface ICreateCalculation {
  idUuid: string;
  daysPassed: number;
  monthsPassed: number;
  yearsPassed: number;
  salaryPercentage: number;
  zipCodeData: ZipCodeData;
}
