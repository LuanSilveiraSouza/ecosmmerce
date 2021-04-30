import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketService } from 'src/ticket/ticket.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from './cartItem.entity';

@Injectable()
export class CartService {
    constructor(
        private readonly userService: UserService,
        private readonly ticketService: TicketService,
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        @InjectRepository(CartItemEntity)
        private readonly cartItemRepository: Repository<CartItemEntity>,
    ) {}

    async findByUserId(id: number): Promise<CartEntity> {
        const user = await this.userService.findById(id);

        if (!user) {
            return null;
        }

        if (!user.cart) {
            const cart = new CartEntity();
            cart.total_price = 0;
            cart.user = user;
            await this.cartRepository.save(cart);
        }

        return user.cart;
    }

    async addItem({ user_id, ticket_id, qtd }): Promise<CartItemEntity> {
        const ticket = await this.ticketService.findById(ticket_id);
        if (!ticket) {
            return null;
        }

        const cart = await this.findByUserId(user_id);

        if (!cart) {
            return null;
        }

        const item = new CartItemEntity();
        item.ticket = ticket;
        item.qtd = qtd;
        // TODO: Option to include transport cost in the travel
        item.price = ticket.price * qtd;
        await this.cartItemRepository.save(item);

        cart.cartItems.push(item);
        cart.total_price = Number(cart.total_price) + item.price;
        await this.cartRepository.save(cart);

        return item;
    }

    async deleteItem({ user_id, id }): Promise<CartItemEntity> {
        const cart = await this.findByUserId(user_id);
        if (!cart) {
            return null;
        }

        const item = await this.cartItemRepository.findOne(
            { id },
            { relations: ['cart'] },
        );
        if (!item) {
            return null;
        }

        if (item.cart.id == cart.id) {
            cart.total_price = Number(cart.total_price) - item.price;
            await this.cartRepository.save(cart);
            return await this.cartItemRepository.remove(item);
        }
        return null;
    }
}
