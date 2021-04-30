/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
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

    @ManyToOne((type) => TravelEntity, (travel) => travel.tickets)
    @JoinColumn({ name: 'travel_id' })
    travel: TravelEntity;
}
