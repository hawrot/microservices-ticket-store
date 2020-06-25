import express from 'express';
import {json} from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";
import {errorHandler, NotFoundError, currentUser} from '@mhmicrotickets/common';

import {showTicketRouter} from "./routes/show";
import {createTicketRouter} from "./routes/new";
import {indexTicketRouter} from "./routes/index";
import {updateTicketRouter} from "./routes/update";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);



//Throw error on wrong route
app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

export { app };
