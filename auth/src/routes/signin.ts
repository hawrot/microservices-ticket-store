import express, {Request, Response} from 'express';
import {body} from "express-validator";

import {validateRequest} from "../middlewares/validate-request";
import {User} from "../models/users";
import {BadRequestErr} from "../errors/bad-request-err";
import {Password} from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/users/signin', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must enter the password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (!existingUser) {
            throw new BadRequestErr('Invalid credentials');
        }
        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestErr('Invalid credentials');
        }

        //Generate JWT
        const userJwt =jwt.sign({
                id: existingUser.id,
                email: existingUser.id
            }, process.env.JWT_KEY!
        );

        //Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(200).send(existingUser);

    });


export {router as signInRouter};
