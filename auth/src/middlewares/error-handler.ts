import express, {Response, Request, NextFunction} from 'express';
import {CustomErr} from "../errors/custom-err";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   if(err instanceof CustomErr){
       return res.status(err.statusCode).send({errors: err.serializeErrors()});
   }


   res.status(400).send({errors: [{message: 'Something went wrong!'}]});
};
