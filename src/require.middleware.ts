/* eslint-disable prettier/prettier */
// src/middleware/authentication.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log('Middleware invoked.');

    if (!token) {
      return res.status(401).json({ error: 'You need to authenticate to use this feature.' });
    }

    try {
      console.log('Token received:', token);
      const decoded: any = jwt.verify(token, 'your'); // Replace with your actual secret key
     // req.userId = decoded.userId;
      console.log('Token decoded successfully:', decoded);
      next();
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return res.status(401).json({ error: 'Invalid token.' });
    }
  }
}
