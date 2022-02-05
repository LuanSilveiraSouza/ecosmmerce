import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { grpcOptions } from '../common/pb/grpc.options';
import { TransportService } from '../common/pb/transport.interface';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketService implements OnModuleInit {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  @Client(grpcOptions) private readonly client: ClientGrpc;
  private grpcService: TransportService;

  onModuleInit() {
    this.grpcService =
      this.client.getService<TransportService>('TransportService');
  }

  async findAll(): Promise<TicketEntity[]> {
    return await this.ticketRepository.find({
      relations: ['travel'],
    });
  }

  async findById(id: number, origin?: string): Promise<any> {
    const ticket = await this.ticketRepository.findOne({
      relations: ['travel'],
      where: { id: id },
    });

    if (origin) {
      const transportPrice = await this.grpcService
        .calcTransport({
          origin,
          destiny: ticket.travel.destiny,
        })
        .toPromise();

      return { ...ticket, transport_price: transportPrice };
    }

    return ticket;
  }

  async updateQuantity(id: number, qtd: number): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: id },
    });

    if (qtd >= 0) {
      ticket.purchased = qtd;
    }

    await this.ticketRepository.save(ticket);

    return ticket;
  }
}
