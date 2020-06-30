import express, {Request, Response} from 'express';
import {BadRequestErr, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@mhmicrotickets/common";
import {body} from "express-validator";
import mongoose from 'mongoose';
import {Ticket} from "../models/ticket";
import {Order} from "../models/order";

import {OrderCreatedPublisher} from "../events/publishers/order-created-publisher";
import {natsWrapper} from "../nats-wrapper";


const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60; //15 minutes;

router.post('/api/orders', requireAuth, [
    body('ticketId').not().isEmpty().custom((input: string) => mongoose.Types.ObjectId.isValid(input)).withMessage('Ticket id must be provided')
], validateRequest, async (req: Request, res: Response) => {
    const {ticketId} = req.body;
    //Find the ticket that user is trying to order
    const ticket = await Ticket.findById(ticketId);

    if (!ticket){
        throw new NotFoundError();
    }

    //Make sure that a ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved){
        throw new BadRequestErr('Ticket is already reserved');
    }

    //Calculate an expiration date for an order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    //Build the order and save into DB

    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket
    });
    await order.save();


    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    })

    res.status(201).send(order);

});

export {router as newOrderRouter};
