import * as mongoose from 'mongoose';

interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const User = new mongoose.Schema<User>({
  id: String,
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

const UserModel = mongoose.model('users', User);

export { UserModel, User };
