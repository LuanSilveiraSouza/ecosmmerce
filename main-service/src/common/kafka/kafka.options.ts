import { Transport, ClientProviderOptions } from '@nestjs/microservices';

export const kafkaOptions: ClientProviderOptions = {
    name: 'KAFKA_SERVICE',
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [`localhost:9092`],
            clientId: 'kafka-client',
        },
        consumer: {
            groupId: 'kafka-consumer',
            allowAutoTopicCreation: true,
        },
    },
};
