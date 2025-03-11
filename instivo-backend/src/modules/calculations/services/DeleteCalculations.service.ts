import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import { NotFoundError } from '@shared/errors';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCalculationsService {
  constructor(
    @inject('CalculationsRepository')
    private calculationRepository: ICalculationsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const calculation = await this.calculationRepository.findById(id);

    if (!calculation) {
      throw new NotFoundError('Calculation not found');
    }

    await this.calculationRepository.delete(id);
  }
}

export default DeleteCalculationsService;
