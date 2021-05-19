import { Controller, Get, Param, Query } from '@nestjs/common';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async findAll(): Promise<TicketEntity[]> {
        return await this.ticketService.findAll();
    }

    @Get('/:id')
    async findById(@Param() params, @Query() query): Promise<any> {
        return await this.ticketService.findById(
            params.id,
            query.origin || null,
        );
    }
}
