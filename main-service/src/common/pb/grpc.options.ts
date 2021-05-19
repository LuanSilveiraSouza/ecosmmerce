import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: `transport-service:${process.env.GRPC_PORT || 3131}`,
        package: 'transport',
        protoPath: join(__dirname, './transport.proto'),
    },
};
