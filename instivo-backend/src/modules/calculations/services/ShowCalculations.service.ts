import { Calculation } from '@entities/Calculation.entity';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { NotFoundError } from '@shared/errors';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

type IResponse = Calculation | null;

@injectable()
class ShowCalculationsService {
  constructor(
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const calculations = await this.calculationRepository.findOne({
      idUuid: id,
    });

    if (!calculations) {
      throw new NotFoundError('Calculation not found');
    }

    return calculations;
  }
}

export default ShowCalculationsService;
