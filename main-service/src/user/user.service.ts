import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';
import { CartEntity } from 'src/cart/cart.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['cart'] });
  }

  async findByName(name: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ name });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(
      { id },
      {
        relations: [
          'cart',
          'cart.cartItems',
          'cart.cartItems.ticket',
          'cart.cartItems.ticket.travel',
        ],
      },
    );
  }

  async create({ name, password }): Promise<IUser> {
    const newUser = new UserEntity();
    newUser.name = name;
    newUser.password = password;
    newUser.cart = new CartEntity();
    newUser.cart.total_price = 0;

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
        exp: date.getTime() + 1000 * 60 * 60 * 24 * 3,
      },
      process.env.JWT_SECRET,
    );
  }
}
