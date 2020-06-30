import {Message} from 'node-nats-streaming';
import {Subjects, Listener, TicketUpdatedEvents} from "@mhmicrotickets/common";
import {Ticket} from "../../models/ticket";
import {queueGroupName} from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvents>{
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvents["data"], msg: Message) {
        const ticket = await Ticket.findById(data.id);

        if (!ticket){
            throw new Error('Ticket not found');
        }

        const {title, price} = data;
        ticket.set({title, price});

        await ticket.save();

        msg.ack();
    }





}
