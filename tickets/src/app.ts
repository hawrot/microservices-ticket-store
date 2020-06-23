import express from 'express';
import {json} from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import {errorHandler, NotFoundError, currentUser} from '@mhmicrotickets/common';


import {createTicketRouter} from "./routes/new";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);

app.use(createTicketRouter);

//Throw error on wrong route
app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };
