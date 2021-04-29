/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CartItemEntity } from './cartItem.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @OneToOne((type) => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany((type) => CartItemEntity, (CartItem) => CartItem.cart)
  cartItems: CartItemEntity[];
}
