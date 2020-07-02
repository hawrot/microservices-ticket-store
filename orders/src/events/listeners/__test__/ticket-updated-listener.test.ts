import {TicketUpdatedListener} from "../ticket-updated-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../models/ticket";
import mongoose from 'mongoose';
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
        ack: jest.fn();
    }

    return {msg, data, ticket, listener};

};

it('should find upates and save save a ticket', async function () {
    
});

it('should ack the message', async function () {

});
