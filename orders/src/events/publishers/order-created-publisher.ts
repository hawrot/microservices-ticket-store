import {Publisher, OrderCreatedEvent, Subjects} from "@mhmicrotickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}
