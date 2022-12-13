import { AuthUseCase } from "@app/use-cases/auth";
import { IOrmClient } from "@infra/database/orm/interfaces";
import { EncrypterServiceFactory, JwtServiceFactory } from "@infra/factories";

export class AuthUseCaseFactory {
   static create(orm: IOrmClient) {
      const jwtService = JwtServiceFactory.create();
      const ecnrypter = EncrypterServiceFactory.create();

      return new AuthUseCase(jwtService, orm.userRepository, ecnrypter);
   }
}
