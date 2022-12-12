import { AuthUseCase } from "@app/use-cases/auth";
import { EncrypterServiceFactory, JwtService } from "@infra/factories";
import { IOrmClient } from "@infra/database/orm/interfaces";

export class AuthUseCaseFactory {
   static create(orm: IOrmClient) {
      const jwtService = JwtService.create();
      const ecnrypter = EncrypterServiceFactory.create();

      return new AuthUseCase(jwtService, orm.userRepository, ecnrypter);
   }
}
