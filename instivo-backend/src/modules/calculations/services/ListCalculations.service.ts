import { Calculation } from '@entities/Calculation.entity';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import ICreateCalculation from '@repositories/interfaces/ICreateCalculation';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  page: number;
  limit: number;
  filters?: Partial<ICreateCalculation>;
}

type IResponse = Partial<Calculation>[];

@injectable()
class ListCalculationsService {
  constructor(
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,
  ) {}
  public async execute({ page, limit, filters }: IRequest): Promise<IResponse> {
    const calculations = await this.calculationRepository.findAll(
      filters ? filters : {},
      page,
      limit,
    );

    const calculationsResponse = calculations.map((calculation) => {
      return {
        idUuid: calculation.idUuid,
        daysPassed: calculation.daysPassed,
        monthsPassed: calculation.monthsPassed,
        yearsPassed: calculation.yearsPassed,
        salaryPercentage: calculation.salaryPercentage,
        zipCodeData: calculation.zipCodeData,
      };
    });

    return calculationsResponse;
  }
}

export default ListCalculationsService;
