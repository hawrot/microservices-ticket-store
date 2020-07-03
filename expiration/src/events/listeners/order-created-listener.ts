import {Listener, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";
import {queueGroupName} from "./queue-group-name";
import {Message} from 'node-nats-streaming';
import {expirationQueue} from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;


    // @ts-ignore
    async onMessage(data: OrderCreatedListener["data"], msg: Message) {
        await expirationQueue.add({
                orderId: data.id
            },
            {
                delay: 10000,
            }
        );

        msg.ack();
    }
}
