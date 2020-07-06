import mongoose from 'mongoose';
import {OrderCreatedEvent, OrderStatus} from "@mhmicrotickets/common";
import {natsWrapper} from "../../../nats-wrapper";
import {OrderCreatedListener} from "../order-created-listener";
import {Message} from 'node-nats-streaming';
import {Order} from "../../../models/order";

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);
    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: '123',
        userId: 'asdasdasd',
        status: OrderStatus.Created,
        ticket: {
            id: '2313wsda',
            price: 10
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, data, msg};
}

it('should replicate the order info',async function () {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('should ack the msg', async function () {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});








