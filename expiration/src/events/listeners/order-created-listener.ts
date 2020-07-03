import {Listener, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";
import {queueGroupName} from "./queue-group-name";
import {Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    // @ts-ignore
    async onMessage(data: OrderCreatedListener["data"], msg: Message) {
    }
}
