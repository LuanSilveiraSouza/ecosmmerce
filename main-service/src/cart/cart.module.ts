import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { CartItemEntity } from './cartItem.entity';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
        UserModule,
        TicketModule,
    ],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'carts', method: RequestMethod.GET },
                { path: 'carts', method: RequestMethod.POST },
                { path: 'carts/:id', method: RequestMethod.DELETE },
                { path: 'carts/finish', method: RequestMethod.PUT },
            );
    }
}
