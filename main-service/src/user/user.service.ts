import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(name: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ name });
  }

  async create({ name, password }): Promise<IUser> {
    const newUser = new UserEntity();
    newUser.name = name;
    newUser.password = password;

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async delete(name: string): Promise<void> {
    await this.userRepository.delete({ name });
    return;
  }

  async generateToken(user: IUser): Promise<any> {
    const date = new Date();

    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        exp: date.getTime() * 1000 * 60 * 60 * 24 * 3,
      },
      process.env.JWT_SECRET,
    );
  }
}
