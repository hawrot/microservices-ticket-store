import {Publisher, TicketUpdatedEvents, Subjects} from '@mhmicrotickets/common';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvents> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

