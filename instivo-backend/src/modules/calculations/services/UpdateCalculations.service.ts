import { Calculation } from '@entities/Calculation.entity';
import CalculationService from '@modules/calculations/services/Calculations.service';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { NotFoundError } from '@shared/errors';
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

    @inject('CalculationsService')
    private calculationsService: CalculationService,
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

    const newCalculation = await this.calculationsService.execute({
      date,
      salary,
      zipCode,
    });

    calculation.daysPassed = newCalculation.daysPassed;
    calculation.monthsPassed = newCalculation.monthsPassed;
    calculation.yearsPassed = newCalculation.yearsPassed;
    calculation.salaryPercentage = newCalculation.salaryPercentage;
    calculation.zipCodeData = newCalculation.zipCodeData;

    return this.calculationRepository.save(calculation);
  }
}

export default UpdateCalculationsService;
