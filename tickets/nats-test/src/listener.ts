import nats, {Message} from 'node-nats-streaming';

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

    const options = stan.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable();
    const subscription = stan.subscribe('ticket:created', 'order-service-queue-group', options);

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`)
        }

        msg.ack();

    });
});

process.on('SIGNT', () => stan.close());
process.on('SIGTERM', () => stan.close());
