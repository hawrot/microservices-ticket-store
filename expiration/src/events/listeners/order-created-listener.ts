import {Listener, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";
import {queueGroupName} from "./queue-group-name";
import {Message} from 'node-nats-streaming';
import {expirationQueue} from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;


    // @ts-ignore
    async onMessage(data: OrderCreatedListener["data"], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Waiting this time to preccess the job: ', delay)
        await expirationQueue.add({
                orderId: data.id
            },
            {
                delay: delay,
            }
        );

        msg.ack();
    }
}
