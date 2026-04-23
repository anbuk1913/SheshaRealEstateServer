import User, { IUser } from './user.model';

export class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async create(payload: Partial<IUser>) {
    return User.create(payload);
  }

  async update(id: string, payload: Partial<IUser>) {
    return User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }
}

export const userRepository = new UserRepository();
