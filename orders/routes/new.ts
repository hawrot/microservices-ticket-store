import express, {Request, Response} from 'express';
import {requireAuth, validateRequest} from "@mhmicrotickets/common";
import {body} from "express-validator";


const router = express.Router();

router.post('/api/orders', requireAuth, [
    body('ticketId').not().isEmpty().withMessage('Ticket id must be provided')
], async (req: Request, res: Response) => {
    res.send({});
});

export {router as newOrderRouter};
