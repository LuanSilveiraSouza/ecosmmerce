import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { CartItemEntity } from './cartItem.entity';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    TypeOrmModule.forFeature([CartItemEntity]),
    UserModule,
    TicketModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware);
  }
}
