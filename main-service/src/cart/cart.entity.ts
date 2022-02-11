/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CartItemEntity } from './cartItem.entity';

export enum CartStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
}

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_price: number;

  @Column()
  status: CartStatus;

  @ManyToOne((type) => UserEntity, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany((type) => CartItemEntity, (CartItem) => CartItem.cart)
  cartItems: CartItemEntity[];
}
