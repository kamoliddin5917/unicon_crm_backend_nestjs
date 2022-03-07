import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from '../utils/jwt';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;
      const { adminId } = jwtVerify(token);

      if (!adminId) {
        throw new HttpException('Not token', HttpStatus.FORBIDDEN);
      }

      req['adminId'] = adminId;

      next();
    } catch (error) {
      throw new HttpException('Not token', HttpStatus.FORBIDDEN);
    }
  }
}
