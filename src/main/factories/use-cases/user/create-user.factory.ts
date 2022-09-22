import { CreateUserUseCase } from "@/app/use-cases/user";
import { EncryptAdapter, UuidAdapter } from "@/infra/adapters";
import { IOrmClient } from "@/infra/database/orm/interfaces";
export class CreateUserUseCaseFactory {

  static build(orm: IOrmClient): CreateUserUseCase {
    const uuid = new UuidAdapter().adapt()
    const encrypter = new EncryptAdapter().adapt();

    return new CreateUserUseCase(
      uuid,
      orm.userRepository,
      encrypter
    )
  }
}