import {Subjects, Publisher, PaymentCreatedEvent} from "@mhmicrotickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;



}
