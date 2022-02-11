import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketService } from '../ticket/ticket.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CartEntity, CartStatus } from './cart.entity';
import { CartItemEntity } from './cartItem.entity';
import { TransportService } from '../common/pb/transport.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService implements OnModuleInit {
  constructor(
    @Inject('GRPC_SERVICE')
    private readonly grpcClient: ClientGrpc,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  private grpcService: TransportService;

  onModuleInit() {
    this.grpcService =
      this.grpcClient.getService<TransportService>('TransportService');
  }

  async findByUserId(id: number): Promise<CartEntity> {
    const user = await this.userService.findById(id);

    if (!user) {
      return null;
    }

    if (!user.carts) {
      const cart = new CartEntity();
      cart.total_price = 0;
      cart.status = CartStatus.ACTIVE;
      cart.user = user;
      await this.cartRepository.save(cart);
      return cart;
    }

    return user.carts.find((cart) => cart.status === CartStatus.ACTIVE);
  }

  async addItem(
    user_id: number,
    ticket_id: number,
    qtd: number,
    origin?: string,
  ): Promise<CartItemEntity> {
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
    item.transport_price = 0;
    if (origin) {
      const transportPrice = await firstValueFrom(
        this.grpcService.calcTransport({
          origin,
          destiny: ticket.travel.destiny,
        }),
      );

      item.transport_price = parseFloat(transportPrice.cost) * qtd;
    }
    item.price = ticket.price * qtd;
    await this.cartItemRepository.save(item);

    cart.cartItems.push(item);
    cart.total_price =
      Number(cart.total_price) + item.price + item.transport_price;
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
      cart.total_price =
        Number(cart.total_price) - item.price - item.transport_price;
      await this.cartRepository.save(cart);
      return await this.cartItemRepository.remove(item);
    }
    return null;
  }
}
