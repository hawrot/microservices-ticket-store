import nats, {Message, Stan} from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
    url: 'http://localhost:4222'
});


stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    })

    new TicketCreatedListener(stan).listen();

});

process.on('SIGNT', () => stan.close());
process.on('SIGTERM', () => stan.close());



