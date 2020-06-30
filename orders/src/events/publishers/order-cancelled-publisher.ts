import {Publisher, Subjects, OrderCancelledEvent} from "@mhmicrotickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
readonly subject = Subjects.OrderCancelled;

}
