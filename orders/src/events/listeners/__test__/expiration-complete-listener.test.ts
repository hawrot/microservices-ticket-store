import {ExpirationCompleteListener} from "../expiration-complete-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Order} from "../../../models/order";
import {Ticket} from "../../../models/ticket";
import mongoose, {set} from 'mongoose';
import {OrderStatus, ExpirationCompleteEvent} from "@mhmicrotickets/common";
import {Message} from 'node-nats-streaming';
import {raw} from "express";

const setup = async ( ) => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'Title Ticket',
        price: 20,
    });

    await ticket.save();


    const order = Order.build({
        userId: 'wqrqrewrew',
        status: OrderStatus.Created,
        expiresAt: new Date(),
        ticket
    });

    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }
    return {listener, data, order, ticket, msg};
}

it('should update the order status to cancelled ',async function  () {
    const {listener, order, ticket, data, msg} = await setup();
    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('should emit OrderCnacelled event', async function () {
    const {listener, order, ticket, data, msg} = await setup();
    await listener.onMessage(data, msg);

    const eventData =  JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])

    expect(eventData.id).toEqual(order.id);
});

it('should emit the message', async function () {
    const {listener, order, ticket, data, msg} = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});
