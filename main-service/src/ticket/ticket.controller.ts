import { Controller, Get } from '@nestjs/common';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async findAll(): Promise<TicketEntity[]> {
        return await this.ticketService.findAll();
    }
}
