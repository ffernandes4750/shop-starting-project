import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { User, Role } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async createUser(params: {
    email: string;
    name: string;
    role: Role;
    passwordHash: string;
  }) {
    const doc = new this.userModel({
      email: params.email.toLowerCase(),
      name: params.name,
      role: params.role,
      passwordHash: params.passwordHash,
      status: 'active',
    });
    return doc.save();
  }
}
