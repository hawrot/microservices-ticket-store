import request from 'supertest';
import {app} from "../../app";
import {Ticket} from "../../models/ticket";
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('should return a 404 if the provided id does not exist', async function () {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'abcdef',
            price: 20
        })
        .expect(404);
});
it('should return a 401 if the user is not auth', async function () {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'abcdef',
            price: 20
        })
        .expect(401);
});
it('should return a 401 if the user does not own the ticket', async function () {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcdef',
            price: 20
        })
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'abcdef',
            price: 20
        })
        .expect(401)
});
it('should return a 400 if the user provides an invalid title or price', async function () {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcdef',
            price: 20
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: '123'
        })
        .expect(400);

});
it('should update the ticket with valid inputs', async function () {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcdef',
            price: 20
        })
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'qwery',
            price: 123
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('qwery');
    expect(ticketResponse.body.price).toEqual(123);
});

it(' should publish an event', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

