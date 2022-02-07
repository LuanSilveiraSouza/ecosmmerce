import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    CartModule,
    TicketModule,
    ConfigModule.forRoot({
      envFilePath: `../.env.${process.env.NODE_ENV == 'dev' ? 'dev' : ''}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASS'),
        database: configService.get('PG_DB'),
        synchronize: false,
        migrationsRun: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migration',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
