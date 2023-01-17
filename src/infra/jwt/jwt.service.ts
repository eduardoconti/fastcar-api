import { IJwtService } from '@app/interfaces';
import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

const EXPIRATION = '1d';
@Injectable()
export class JwtService implements IJwtService {
  sign<T>(payload: T) {
    const SECRET = process.env.JWT_SECRET as string;
    return jwt.sign(payload as object, SECRET, {
      expiresIn: EXPIRATION,
    });
  }

  verify(token: string) {
    const SECRET = process.env.JWT_SECRET as string;
    try {
      jwt.verify(token, SECRET, {
        ignoreExpiration: false,
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}
