import request from 'supertest';
import {app} from "../../app";
import mongoose from 'mongoose';
import {Order} from "../../models/order";
import {Ticket} from "../../models/ticket";
import {OrderStatus} from "@mhmicrotickets/common";

it('should return an error if the ticket does not exist',  async function () {
   const ticketId = mongoose.Types.ObjectId();

   await request(app)
       .post('/api/orders')
       .set('Cookie', global.signin())
       .send({
           ticketId
       })
       .expect(404);

});
it('should return an error if the ticket is already reserved',async function () {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();
    const order = Order.build({
        ticket,
        userId: 'asdfghj',
        status: OrderStatus.Created,
        expiresAt: new Date()
    })

    await order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(400)
});
it('should return a ticket',  async function () {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send({ticketId: ticket.id})
        .expect(201)


});


it.todo('should emit an order created event');
