import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from './cartItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(id: number): Promise<CartEntity> {
    let cart = await this.cartRepository.findOne({
      relations: ['user', 'cartItems'],
      where: { 'user.id': id },
    });

    if (!cart) {
      const user = await this.userRepository.findOne({ id });

      if (!user) {
        return null;
      }

      cart = new CartEntity();
      cart.user = user;
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItem({ user_id, ticket_id, qtd }): Promise<CartItemEntity> {
    const ticket = await this.ticketRepository.findOne({ id: ticket_id });
    if (!ticket) {
      return null;
    }

    const cart = await this.findByUserId(user_id);
    if (!cart) {
      return null;
    }

    const item = new CartItemEntity();
    item.cart = cart;
    item.ticket = ticket;
    item.qtd = qtd;
    // TODO: Option to include transport cost in the travel
    const transportCost = 0;
    item.price = ticket.price * qtd + transportCost;

    await this.cartItemRepository.save(item);

    return item;
  }

  async deleteItem({ user_id, id }): Promise<CartItemEntity> {
    const cart = await this.findByUserId(user_id);
    if (!cart) {
      return null;
    }

    const item = await this.cartItemRepository.findOne({ id });
    if (!item) {
      return null;
    }

    if (item.cart.id == cart.id) {
      return await this.cartItemRepository.remove(item);
    }
    return null;
  }
}
