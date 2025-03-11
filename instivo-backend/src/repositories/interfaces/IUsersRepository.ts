import { User } from '@entities/User.entity';
import ICreateUser from '@repositories/interfaces/ICreateUser';
import { ObjectId } from 'mongoose';

export default interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;

  save(user: User): Promise<User>;

  findById(id: ObjectId): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;
}
