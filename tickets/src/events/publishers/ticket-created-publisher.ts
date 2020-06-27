import {Publisher, TicketCreatedEvent} from '@mhmicrotickets/common';
import {Subjects} from "../../../../common/src";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;

}


