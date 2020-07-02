import {Listener, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";
import {queueGroupName} from "./quque-grouo-name";
import {Message} from 'node-nats-streaming';
import {Ticket} from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

   async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        //Find the ticket which is reserved in by the order
       const ticket = await Ticket.findById(data.ticket.id);

       if(!ticket){
           throw new Error('Ticket not found');
       }

       ticket.set({orderId: data.id})

       await ticket.save();

       msg.ack();

    }
}
