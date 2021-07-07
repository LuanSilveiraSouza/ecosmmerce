import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        url: `localhost:${process.env.GRPC_PORT}`,
        package: 'transport',
        protoPath: join(__dirname, './transport.proto'),
    },
};
