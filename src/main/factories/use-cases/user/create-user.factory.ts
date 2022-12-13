import { CreateUserUseCase } from "@app/use-cases/user";
import { IOrmClient } from "@infra/database/orm/interfaces";
import { EncrypterServiceFactory } from "@infra/factories";

export class CreateUserUseCaseFactory {
   static create(orm: IOrmClient): CreateUserUseCase {
      const encrypter = EncrypterServiceFactory.create();

      return new CreateUserUseCase(orm.userRepository, encrypter);
   }
}
