import {Listener, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";
import {queueGroupName} from "./quque-grouo-name";
import {Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

   async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        
    }
}
