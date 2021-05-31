import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            brokers: [`${process.env.KAFKA_HOST}:29092`],
            clientId: 'nestjs-client',
        },
        consumer: {
            groupId: '1',
            allowAutoTopicCreation: true,
        },
    },
};
