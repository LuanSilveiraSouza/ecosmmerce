import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item-dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

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

  @Patch('/finish')
  async finishCart(@Req() req: Request) {
    const cart = await this.cartService.findByUserId(req['user'].id);

    console.log(`Closing cart from user ${req['user'].name}`);

    return cart;
  }
}
