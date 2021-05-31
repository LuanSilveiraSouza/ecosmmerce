import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    OnModuleInit,
    Param,
    Post,
    Req,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { Request } from 'express';
import { kafkaOptions } from 'src/common/kafka/kafka.options';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item-dto';

@Controller('carts')
export class CartController implements OnModuleInit {
    constructor(private readonly cartService: CartService) {}

    @Client(kafkaOptions)
    client: ClientKafka;

    onModuleInit() {
        this.client.subscribeToResponseOf('orders');
    }

    @Get()
    async findByUserId(@Req() req: Request): Promise<CartEntity> {
        const cart = await this.cartService.findByUserId(req['user'].id);

        if (!cart) {
            throw new HttpException(
                {
                    message: `User don't exists`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        this.client.emit<string>('orders', cart);

        return cart;
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async addItem(@Req() req: Request, @Body() itemData: AddItemDto) {
        const result = this.cartService.addItem(
            req['user'].id,
            itemData.ticket_id,
            itemData.qtd,
            itemData.origin,
        );

        if (!result) {
            throw new HttpException(
                {
                    message: `User or ticket don't exists`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return result;
    }

    @Delete('/:id')
    async deleteItem(@Req() req: Request, @Param() params) {
        const result = await this.cartService.deleteItem({
            user_id: req['user'].id,
            id: params.id,
        });

        if (!result) {
            throw new HttpException(
                {
                    message: `Cart or item don't exists`,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        return result;
    }

    @EventPattern('orders')
    async handleEntityCreated(payload: any) {
        console.log(JSON.stringify(payload) + ' created');
    }
}
