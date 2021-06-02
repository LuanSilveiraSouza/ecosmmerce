const { Kafka } = require('kafkajs');
const MongoConnectionFactory = require('./database/connection');

(async function () {
    const kafka = new Kafka({
        clientId: 'node-test-client',
        brokers: [`${process.env.KAFKA_HOST}:29092`],
    });

    const mongoClient = await MongoConnectionFactory();

    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'orders', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (topic == 'orders') {
                console.log(message.value.toString());
            }
        },
    });
})();
