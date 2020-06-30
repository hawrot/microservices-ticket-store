import express, {Request, Response} from 'express';
import {BadRequestErr, NotFoundError, OrderStatus, requireAuth, validateRequest} from "@mhmicrotickets/common";
import {body} from "express-validator";
import mongoose from 'mongoose';
import {Ticket} from "../src/models/ticket";
import {Order} from "../src/models/order";


const router = express.Router();

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

    if (existingOrder){
        throw new BadRequestErr('Ticket is already reserved');
    }


    //Calculate an expiration date for an order


    //Build the order and save into DB


});

export {router as newOrderRouter};
