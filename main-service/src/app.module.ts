import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ConfigModule.forRoot({ envFilePath: '../.env' }),
        UserModule,
        TicketModule,
        CartModule,
    ],
    controllers: [AppController],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
