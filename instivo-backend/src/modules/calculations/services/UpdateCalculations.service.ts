import { Calculation } from '@entities/Calculation.entity';
import ZipCodeService from '@modules/zipCodes/services/ZipCode.service';
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

type IResponse = Calculation;

@injectable()
class UpdateCalculationsService {
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

    const currentDate = new Date();
    const inputDate = new Date(date);

    const daysPassed = differenceInDays(currentDate, inputDate);
    const monthsPassed = differenceInMonths(currentDate, inputDate);
    const yearsPassed = differenceInYears(currentDate, inputDate);
    const salaryPercentage = salary * 0.35;

    const zipCodeData = await this.zipCodeService.getZipCodeData(
      zipCode.replace(/\D/g, ''),
    );

    calculation.daysPassed = daysPassed;
    calculation.monthsPassed = monthsPassed;
    calculation.yearsPassed = yearsPassed;
    calculation.salaryPercentage = salaryPercentage;
    calculation.zipCodeData = zipCodeData;

    return this.calculationRepository.save(calculation);
  }
}

export default UpdateCalculationsService;
