import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { createHash } from 'crypto';
import { CartEntity } from '../cart/cart.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPass() {
    this.password = createHash('sha256')
      .update(this.password, 'utf-8')
      .digest('hex');
  }

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;
}
