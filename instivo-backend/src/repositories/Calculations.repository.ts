import { Calculation, CalculationModel } from '@entities/Calculation.entity';
import ICalculationsRepository from '@repositories/interfaces/ICalculationsRepository';
import ICreateCalculation from '@repositories/interfaces/ICreateCalculation';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

class CalculationsRepository implements ICalculationsRepository {
  private readonly calculations: Model<Calculation>;

  constructor() {
    this.calculations = CalculationModel;
  }

  public async create({
    daysPassed,
    monthsPassed,
    salaryPercentage,
    yearsPassed,
    zipCodeData,
  }: ICreateCalculation): Promise<Calculation> {
    const calculation = new CalculationModel({
      idUuid: uuid(),
      daysPassed,
      monthsPassed,
      salaryPercentage,
      yearsPassed,
      zipCodeData,
    });
    await calculation.save();
    return calculation;
  }

  public async findAll(
    filters: Partial<ICreateCalculation>,
    page: number = 1,
    limit: number = 10,
  ): Promise<Calculation[]> {
    const skip = (page - 1) * limit;
    return this.calculations.find(filters).skip(skip).limit(limit);
  }

  public async findOne(
    filters: Partial<ICreateCalculation>,
  ): Promise<Calculation | null> {
    return this.calculations.findOne(filters);
  }

  public async findById(id: string): Promise<Calculation | null> {
    return this.calculations.findOne({ idUuid: id });
  }

  public async save(calculation: Calculation): Promise<Calculation> {
    return calculation.save();
  }

  public async delete(id: string): Promise<void> {
    await this.calculations.findOneAndDelete({ idUuid: id });
  }
}

export default CalculationsRepository;
