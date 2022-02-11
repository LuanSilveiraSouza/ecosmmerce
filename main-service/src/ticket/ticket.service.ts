import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportService } from '../common/pb/transport.interface';
import { Repository } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TicketService implements OnModuleInit {
  constructor(
    @Inject('GRPC_SERVICE')
    private readonly grpcClient: ClientGrpc,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  private grpcService: TransportService;

  onModuleInit() {
    this.grpcService =
      this.grpcClient.getService<TransportService>('TransportService');
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
      const transportPrice = await firstValueFrom(
        this.grpcService.calcTransport({
          origin,
          destiny: ticket.travel.destiny,
        }),
      );

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
