/* eslint-disable @typescript-eslint/no-unused-vars */

import { TicketEntity } from '../ticket/ticket.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    transport_price: number;

    @Column()
    qtd: number;

    @ManyToOne((type) => CartEntity, (cart) => cart.cartItems)
    @JoinColumn({ name: 'cart_id' })
    cart: CartEntity;

    @OneToOne((type) => TicketEntity)
    @JoinColumn({ name: 'ticket_id' })
    ticket: TicketEntity;
}
