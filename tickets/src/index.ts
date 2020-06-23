import mongoose from 'mongoose';
import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error('Error JWT must be defined');
    }
    try {
        await mongoose.connect('', {
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


