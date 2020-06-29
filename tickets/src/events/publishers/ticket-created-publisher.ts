import {Publisher, TicketCreatedEvent, Subjects} from '@mhmicrotickets/common';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

