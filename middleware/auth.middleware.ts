import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface User {
  id: number;
}

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'unauthorized' });
      }
      console.log(decoded);

      req.user = decoded as User;
      next();
    });
  }
}

export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req?.user?.id !== 1) {
      return res
        .status(403)
        .json({ message: 'only admin can access this route' });
    }
    next();
  }
}
