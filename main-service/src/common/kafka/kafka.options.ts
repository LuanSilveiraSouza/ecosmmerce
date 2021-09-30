import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [`localhost:9092`],
            clientId: 'nestjs-client',
        },
        consumer: {
            groupId: '1',
            allowAutoTopicCreation: true,
        },
    },
};
