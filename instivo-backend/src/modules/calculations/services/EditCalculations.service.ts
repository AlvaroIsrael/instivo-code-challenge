import ZipCodeService, {
  ZipCodeData,
} from '@modules/zipCodes/services/ZipCode.service';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { NotFoundError } from '@shared/errors';
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
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
class EditCalculationsService {
  constructor(
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,

    @inject('ZipCodeService')
    private zipCodeService: ZipCodeService,
  ) {}

  public async execute({
    id,
    date,
    salary,
    zipCode,
  }: IRequest): Promise<IResponse> {
    const calculation = await this.calculationRepository.findById(id);

    if (!calculation) {
      throw new NotFoundError('Calculation not found');
    }

    if (date) {
      const currentDate = new Date();
      const inputDate = new Date(date);

      calculation.daysPassed = differenceInDays(currentDate, inputDate);
      calculation.monthsPassed = differenceInMonths(currentDate, inputDate);
      calculation.yearsPassed = differenceInYears(currentDate, inputDate);
    }

    if (salary) {
      calculation.salaryPercentage = salary * 0.35;
    }

    if (zipCode) {
      calculation.zipCodeData = await this.zipCodeService.getZipCodeData(
        zipCode.replace(/\D/g, ''),
      );
    }

    const newCalculation = await this.calculationRepository.save(calculation);

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

export default EditCalculationsService;
