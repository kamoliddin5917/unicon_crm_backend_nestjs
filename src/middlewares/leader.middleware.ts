import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from '../utils/jwt';

@Injectable()
export class AuthLeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;
      const { leaderId } = jwtVerify(token);

      if (!leaderId) {
        throw new HttpException('Not token', HttpStatus.FORBIDDEN);
      }

      req[leaderId] = leaderId;

      next();
    } catch (error) {
      throw new HttpException('Not token', HttpStatus.FORBIDDEN);
    }
  }
}
