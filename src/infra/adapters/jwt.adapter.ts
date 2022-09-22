import { IAdapter, IJwtService } from '@/app/interfaces';
import jwt from 'jsonwebtoken'

const SALT = 15
export class JwtAdapter implements IAdapter<IJwtService>{
  adapt(): IJwtService {
    const secret = process.env.JWT_SECRET as string
    const { sign, verify } = jwt
    return {
      sign<T>(payload: T) {
        return sign(payload as Object, secret, {
          expiresIn: '1d'
        })
      },
      verify(token: string) {
        try {
          verify(token, secret)

        } catch (error) {
          return false
        }
        return true
      }
    }
  }
}