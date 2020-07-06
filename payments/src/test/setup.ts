import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from "../app";
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(id? : string): string[];
        }
    }
}
jest.mock('../nats-wrapper');

//process.env.STRIPE_KEY = 'sk_test_cwDCmVdXQ2QGh49nfKJwN4hA00pgqEdcuz';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'abcdef';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    //reset all the data
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});


global.signin =  (id?: string) => {
    //Build a JWT payload = { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    //Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //Build the session object { jwt: MY_JWT }
    const session = {jwt: token};

    //Turn the session into JSON
    const sessionJSON = JSON.stringify(session);

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //Return a string with the cookie and encoded data
    return  [`express:sess=${base64}`];
};
