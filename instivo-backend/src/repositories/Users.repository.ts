import { User, UserModel } from '@entities/User.entity';
import ICreateUser from '@repositories/interfaces/ICreateUser';
import IUsersRepository from '@repositories/interfaces/IUsersRepository';
import { Model, ObjectId } from 'mongoose';

class UsersRepository implements IUsersRepository {
  private readonly users: Model<User>;

  constructor() {
    this.users = UserModel;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ email });
  }

  public async findById(id: ObjectId): Promise<User | null> {
    return this.users.findById(id);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new this.users({ name, email, password });
    await user.save();
    return user;
  }

  public async save(user: User): Promise<User> {
    await this.users.updateOne(user);
    return user;
  }
}

export default UsersRepository;
