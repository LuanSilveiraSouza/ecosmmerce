import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TravelEntity } from './travel.entity';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  total: number;

  @Column()
  purchased: number;

  @Column()
  travel_id: number;
}
