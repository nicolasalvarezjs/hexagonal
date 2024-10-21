import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, ICreateUser } from 'src/domain/user/entities/User';
import { IUserRepository } from 'src/domain/user/repositories/user.repository';

@Injectable()
export class UserRepositoryAdapter implements IUserRepository {
  constructor(
    @InjectModel('User') private userModel: Model<Document & IUser>,
  ) {}

  findByPhone(phone: string): Promise<IUser | null> {
    return this.userModel.findOne({ phone }).populate('Player');
  }
  async create(entity: ICreateUser): Promise<IUser> {
    const user = await this.userModel.create(entity);
    return this.findById(user._id);
  }
  findById(id: string): Promise<IUser> {
    return this.userModel.findById(id).populate('Player');
  }
  async update(id: string, entity: IUser): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(id, entity);
    return this.findById(user._id);
  }
}
