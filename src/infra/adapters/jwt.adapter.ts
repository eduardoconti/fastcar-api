import { IAdapter, IJwtService } from '@/app/interfaces';
import jwt from 'jsonwebtoken'

const EXPIRATION = '1d'
export class JwtAdapter implements IAdapter<IJwtService>{
  adapt(): IJwtService {
    const secret = process.env.JWT_SECRET as string
    const { sign, verify } = jwt
    return {
      sign<T>(payload: T) {
        return sign(payload as Object, secret, {
          expiresIn: EXPIRATION
        })
      },
      verify(token: string) {
        try {
          verify(token, secret, {
            ignoreExpiration: false
          })
        } catch (error) {
          console.log(error)
          return false
        }
        return true
      }
    }
  }
}