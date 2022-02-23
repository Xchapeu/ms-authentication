import { Request, Response, NextFunction } from 'express';
import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if(err instanceof DatabaseError) {
    res.sendStatus(400);
  } else if(err instanceof ForbiddenError) {
    res.sendStatus(403);
  } else {
    res.sendStatus(500);
  }
}

export default errorHandler;