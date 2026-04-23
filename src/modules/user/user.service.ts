import jwt from 'jsonwebtoken';
import { userRepository } from './user.repository';
import { IUser } from './user.model';

export class UserService {
  async login(email: string, password: string) {
    const realEmail = process.env.ADMIN_EMAIL!
    const realPassword = process.env.ADMIN_PASSWORD!
    if (email === realEmail && password === realPassword) {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );
      return { token, user: { id: 'admin', name: 'Admin', email: realEmail, role: 'admin' } };
    } else {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }
  }

  async register(payload: Partial<IUser>) {
    const existing = await userRepository.findByEmail(payload.email!);
    if (existing) throw Object.assign(new Error('Email already in use'), { status: 400 });
    return userRepository.create(payload);
  }

  async getProfile(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    return user;
  }
}

export const userService = new UserService();
