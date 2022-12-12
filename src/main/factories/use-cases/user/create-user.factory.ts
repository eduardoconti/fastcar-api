import { CreateUserUseCase } from "@app/use-cases/user";
import { EncrypterServiceFactory } from "@infra/factories";
import { IOrmClient } from "@infra/database/orm/interfaces";

export class CreateUserUseCaseFactory {
   static create(orm: IOrmClient): CreateUserUseCase {
      const encrypter = EncrypterServiceFactory.create();

      return new CreateUserUseCase(orm.userRepository, encrypter);
   }
}
