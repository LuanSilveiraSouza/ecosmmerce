import { Transport, ClientProviderOptions } from '@nestjs/microservices';
import { join } from 'path';

export const getGRPCOptions = (
  grpcHost: string,
  grpcPort: number,
): ClientProviderOptions => ({
  name: 'transport',
  transport: Transport.GRPC,
  options: {
    url: `${grpcHost}:${grpcPort}`,
    package: 'transport',
    protoPath: join(__dirname, './transport.proto'),
  },
});
