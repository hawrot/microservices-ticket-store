import {OrderCreatedListener} from "../order-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import {OrderCreatedEvent} from "@mhmicrotickets/common";
import mongoose from 'mongoose';
import {OrderStatus} from "@mhmicrotickets/common";
import {Message} from 'node-nats-streaming';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'new concert',
        price: 99,
        userId: 'qwerty'
    });

    await ticket.save();

    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'qw2e3r4t5',
        expiresAt: 'today',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, ticket, data, msg};
}

