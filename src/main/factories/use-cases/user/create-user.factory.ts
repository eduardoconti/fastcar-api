import { CreateUserUseCase } from "@/app/use-cases/user";
import { EncrypterAdapter, UuidAdapter } from "@/infra/adapters";
import { IOrmClient } from "@/infra/database/orm/interfaces";
export class CreateUserUseCaseFactory {

  static build(orm: IOrmClient): CreateUserUseCase {
    const uuid = new UuidAdapter().adapt()
    const encrypter = new EncrypterAdapter().adapt();

    return new CreateUserUseCase(
      uuid,
      orm.userRepository,
      encrypter
    )
  }
}