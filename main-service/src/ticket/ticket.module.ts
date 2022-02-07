import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserModule } from '../user/user.module';
import { ClientsModule } from '@nestjs/microservices';
import { getGRPCOptions } from 'src/common/pb/grpc.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    UserModule,
    ClientsModule.registerAsync([
      {
        name: 'GRPC_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return getGRPCOptions(
            configService.get('GRPC_HOST'),
            configService.get('GRPC_PORT'),
          );
        },
      },
    ]),
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'tickets', method: RequestMethod.GET });
  }
}
