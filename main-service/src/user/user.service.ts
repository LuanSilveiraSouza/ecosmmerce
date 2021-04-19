import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(user: IUser): Promise<IUser> {
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.password = user.password;

    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async delete(name: string): Promise<void> {
    await this.userRepository.delete({ name });
    return;
  }
}
