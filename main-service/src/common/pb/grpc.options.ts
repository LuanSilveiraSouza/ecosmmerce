import { Transport, ClientProviderOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: ClientProviderOptions = {
  name: 'transport',
  transport: Transport.GRPC,
  options: {
    url: `localhost:${process.env.GRPC_PORT || 3131}`,
    package: 'transport',
    protoPath: join(__dirname, './transport.proto'),
  },
};
