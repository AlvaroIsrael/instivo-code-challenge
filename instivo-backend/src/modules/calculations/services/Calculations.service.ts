import ZipCodeService, {
  ZipCodeData,
} from '@modules/zipCodes/services/ZipCode.service';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  date: string;
  salary: number;
  zipCode: string;
}

interface IResponse {
  idUuid: string;
  daysPassed: number;
  monthsPassed: number;
  yearsPassed: number;
  salaryPercentage: number;
  zipCodeData: ZipCodeData;
}

@injectable()
class CalculationService {
  constructor(
    @inject('ZipCodeService')
    private zipCodeService: ZipCodeService,
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,
  ) {}

  public async execute({
    date,
    salary,
    zipCode,
  }: IRequest): Promise<IResponse> {
    const currentDate = new Date();
    const inputDate = new Date(date);

    const daysPassed = differenceInDays(currentDate, inputDate);
    const monthsPassed = differenceInMonths(currentDate, inputDate);
    const yearsPassed = differenceInYears(currentDate, inputDate);
    const salaryPercentage = salary * 0.35;

    const zipCodeData = await this.zipCodeService.getZipCodeData(
      zipCode.replace(/\D/g, ''),
    );

    const newCalculation = await this.calculationRepository.create({
      daysPassed,
      monthsPassed,
      yearsPassed,
      salaryPercentage,
      zipCodeData,
    });

    return {
      idUuid: newCalculation.idUuid,
      daysPassed: newCalculation.daysPassed,
      monthsPassed: newCalculation.monthsPassed,
      yearsPassed: newCalculation.yearsPassed,
      salaryPercentage: newCalculation.salaryPercentage,
      zipCodeData: newCalculation.zipCodeData,
    };
  }
}

export default CalculationService;
