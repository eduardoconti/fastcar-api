import { IJwtService } from "@app/interfaces";
import { JwtService } from "@infra/jwt";

export class JwtServiceFactory {
   static create(): IJwtService {
      return new JwtService();
   }
}
