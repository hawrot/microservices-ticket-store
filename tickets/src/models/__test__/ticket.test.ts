import {Ticket} from "../ticket";

it('should  implement optimistic concurrency control', async function () {
    //Create a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: 'qwert123'
    })

    //Save a ticket to DB
    await ticket.save();

    //Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    //make two separate changes to the tickets we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 15});

    //save the fist fetched ticket
    await firstInstance!.save();

    //save the second fetched ticket
    await secondInstance!.save();

    //save the second fetched ticket and expect an error
});
