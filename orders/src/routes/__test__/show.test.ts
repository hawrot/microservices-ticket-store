// @ts-ignore
import request from 'supertest';
import {app} from "../../app";
import {Order} from "../../models/order";
import {Ticket} from "../../models/ticket";
import {OrderStatus} from "@mhmicrotickets/common";
import mongoose from "mongoose";

it('should  fetch the order', async function () {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // @ts-ignore
    const user = global.signin();

    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ticketId: ticket.id})
        .expect(201);


   const {body: fetchedOrder} =  await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

   expect(fetchedOrder.id).toEqual(order.id);
});


