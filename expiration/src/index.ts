import {natsWrapper} from "./nats-wrapper";
import {OrderCreatedListener} from "./events/listeners/order-created-listener";


const start = async () => {
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined')
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URLmust be defined')
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('MNATS_CLUSTER_ID must be defined')
    }
    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        })

        process.on('SIGNT', () =>  natsWrapper.client.close());
        process.on('SIGTERM', () =>  natsWrapper.client.close());

        new OrderCreatedListener(natsWrapper.client).listen();

    } catch (e) {
        console.log(e);
    }

}

start();


