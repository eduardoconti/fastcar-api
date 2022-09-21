import jwt from 'jsonwebtoken'
import { IJwtService } from "@/app/interfaces";

export class JwtService implements IJwtService {
  async sign<T>(payload: T): Promise<string> {
    return await jwt.sign(payload as Object, process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      })
  }
  async verify(token: string): Promise<boolean> {
    try {
      await jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (error: any) {
      return false
    }

    return true
  }
}