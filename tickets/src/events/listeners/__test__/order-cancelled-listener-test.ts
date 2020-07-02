import {OrderCancelledListener} from "../order-cancelled-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import mongoose, {set} from "mongoose";
import {OrderCancelledEvent} from "@mhmicrotickets/common";
import Message from 'node-nats-streaming';

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

   const orderId = mongoose.Types.ObjectId().toHexString();
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'qwerty',
    })

    ticket.set({orderId});

    await ticket.save();

    // @ts-ignore
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id
        }
    };

    // @ts-ignore
    const msg : Message = {
        ack: jest.fn()
    }

    return { msg, data, ticket, orderId, listener };
}

it('should update, publish the ticket and acks the message', async function () {
    const {msg, data, ticket, orderId, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);
    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();

});
