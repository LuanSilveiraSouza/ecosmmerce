import { createHash } from 'crypto';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPass() {
    const hash = createHash('sha256');

    const data = hash.update(this.password, 'utf-8');

    this.password = data.digest('hex');
  }
}
