import { Calculation } from '@entities/Calculation.entity';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import ICreateCalculation from '@repositories/interfaces/ICreateCalculation';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  page: number;
  limit: number;
  filters?: Partial<ICreateCalculation>;
}

@injectable()
class ListCalculationsService {
  constructor(
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,
  ) {}
  public async execute({
    page,
    limit,
    filters,
  }: IRequest): Promise<Calculation[]> {
    const calculations = await this.calculationRepository.findAll(
      filters ? filters : {},
      page,
      limit,
    );

    return calculations;
  }
}

export default ListCalculationsService;
