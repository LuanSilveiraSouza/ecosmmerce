const { MongoClient } = require('mongodb');

const MongoConnectionFactory = async () => {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:27017/?poolSize=20&writeConcern=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await client.db('main').command({ ping: 1 });
        console.log('Connected to Mongo database');

        return client;
    } catch (error) {
        console.error(error);

        await client.close();

        return null;
    }
};

module.exports = MongoConnectionFactory;
