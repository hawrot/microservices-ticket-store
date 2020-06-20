import express, {Request, Response} from 'express';
import { body } from "express-validator";

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must enter the password')
], (req: Request, res: Response) =>{


});


export {router as signInRouter};
