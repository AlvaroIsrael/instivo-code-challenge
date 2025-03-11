import { Calculation } from '@entities/Calculation.entity';
import ICreateCalculation from '@repositories/interfaces/ICreateCalculation';

export default interface ICalculationsRepository {
  create(calculation: Partial<Calculation>): Promise<Calculation>;

  findAll(
    filters: Partial<ICreateCalculation>,
    page: number,
    limit: number,
  ): Promise<Calculation[]>;

  findOne(filters: Partial<ICreateCalculation>): Promise<Calculation | null>;

  findById(id: string): Promise<Calculation | null>;

  save(calculation: Calculation): Promise<Calculation>;

  delete(id: string): Promise<void>;
}
