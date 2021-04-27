import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('travels')
export class TravelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  destiny: string;

  @Column()
  description: string;
}
