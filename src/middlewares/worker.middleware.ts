import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from '../utils/jwt';

@Injectable()
export class AuthWorkerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;
      const { workerId } = jwtVerify(token);

      if (!workerId) {
        throw new HttpException('Not token', HttpStatus.FORBIDDEN);
      }

      req[workerId] = workerId;

      next();
    } catch (error) {
      throw new HttpException('Not token', HttpStatus.FORBIDDEN);
    }
  }
}
