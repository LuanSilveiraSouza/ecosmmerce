import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: `localhost:${process.env.GRPC_PORT || 3131}`,
        package: 'product',
        protoPath: join(__dirname, './transport.proto'),
    },
};
