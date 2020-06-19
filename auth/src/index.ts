import express from 'express';
import {json} from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";


import {currentUserRouter} from "./routes/current-user";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

//Throw error on wrong route
app.get('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('Error JWT must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.log(e);
    }

    app.listen(3000, () => {
        console.log('[Auth Service] - Listening on port 3000 ');
    })
}

start();


