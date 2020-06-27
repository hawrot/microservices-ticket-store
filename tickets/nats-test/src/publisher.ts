import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect('ticketing', '123', {
    url: 'http://localhost:4222'
});


stan.on('connect', async () => {
   console.log('Publisher connected to NATS');

   const publisher = new TicketCreatedPublisher(stan);
   try {
       await publisher.publish({
           id: '123',
           title: 'concert',
           price: 20
       })
   }catch (e) {
       console.log(e);
   }


 /*  const data = JSON.stringify({
     id: '123',
     title: 'concert',
     price: 20
   });

   stan.publish('ticket:created', data, () => {
       console.log('event published');
   })*/

});

