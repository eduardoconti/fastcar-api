import { CreateUserUseCase } from "@app/use-cases/user";
import { EncrypterAdapter } from "@infra/adapters";
import { IOrmClient } from "@infra/database/orm/interfaces";

export class CreateUserUseCaseFactory {
   static build(orm: IOrmClient): CreateUserUseCase {
      const encrypter = new EncrypterAdapter().adapt();

      return new CreateUserUseCase(orm.userRepository, encrypter);
   }
}
