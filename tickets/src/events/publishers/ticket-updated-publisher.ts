import {Publisher, TicketUpdatedEvent, Subjects} from '@mhmicrotickets/common';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

new TicketUpdatedPublisher(natsWrapper.client).publish({

})
