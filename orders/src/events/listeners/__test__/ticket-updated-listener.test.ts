import {TicketUpdatedListener} from "../ticket-updated-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import mongoose, {set} from 'mongoose';
import {TicketUpdatedEvent} from "@mhmicrotickets/common";
import Message from 'node-nats-streaming';

const setup = async () => {
    const listener = new TicketUpdatedListener(natsWrapper.client);

    const ticket = Ticket.build({
       id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20,
    });
    await ticket.save();


    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'qwertyu'
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {msg, data, ticket, listener};

};

it('should find updates and save save a ticket', async function () {
    const {msg, data, ticket, listener} = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('should ack the message', async function () {
    const {msg, data, ticket, listener} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

});

it('should not call ack if the event has a skipped version', async function () {
    const {msg, data, ticket, listener} = await setup();

    data.version = 10;
    try {
        await listener.onMessage(data, msg);
    }catch (e) {

    }

    expect(msg.ack).not.toHaveBeenCalled();

});
