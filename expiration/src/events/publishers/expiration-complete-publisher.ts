
import {Subjects, Publisher, ExpirationCompleteEvent} from "@mhmicrotickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}
