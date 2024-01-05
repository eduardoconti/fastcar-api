import { IJwtService } from "@app/interfaces";
import jwt from "jsonwebtoken";

const EXPIRATION = "1d";


export class JwtService implements IJwtService {
   sign<T extends object >(payload: T) {
      const SECRET = process.env.JWT_SECRET as string;
      return jwt.sign(payload, SECRET, {
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
