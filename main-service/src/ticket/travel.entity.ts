/* eslint-disable @typescript-eslint/no-unused-vars */

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from './ticket.entity';

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

    @OneToMany((type) => TicketEntity, (ticket) => ticket.travel)
    tickets: TicketEntity[];
}
