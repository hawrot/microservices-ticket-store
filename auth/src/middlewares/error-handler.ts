import express, {Response, Request, NextFunction} from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Sowmething went wromg', err);

  res.status(400).send({message: err.message});
};
