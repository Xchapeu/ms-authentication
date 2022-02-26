import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers['authorization'];

    if(!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if(authenticationType !== 'Bearer' || !token) {
      throw new ForbiddenError("Tipo de autenticação inválida.");
    }

    try {
      const tokenPayload = JWT.verify(token, 'my_secret_key');
  
      if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError("Token inválido");
      }
  
      const user = { 
        uuid: tokenPayload.sub, 
        username: tokenPayload.username 
      };
  
      req.user = user;
      next();
    } catch (err) {
      throw new ForbiddenError("Token inválido");
    }
  } catch (err) {
    next(err)
  }
}

export default jwtAuthenticationMiddleware;

//{
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ1NjYxMjg0LCJzdWIiOiIxOWUwNThlYy1hNTFmLTQ0M2QtODg2Yi04ZWZlMTVkNjBmNzAifQ.N5LwmkAevWPkJlufXSdwGnDlJLKKlaiCbPe_g74lUK4"
// }