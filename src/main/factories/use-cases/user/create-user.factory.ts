import { EncryptUseCase } from "@/app/implementation/encrypt";
import { CreateUserUseCase } from "@/app/use-cases/user";
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface";
import { EncryptAdapter } from "@/main/adapters";
import { UuidFactory } from "../uuid";

export class CreateUserUseCaseFactory {

  static build(orm: IOrmClient): CreateUserUseCase {
    const uuidUseCase = UuidFactory.build();
    const encryptUseCase = new EncryptUseCase(
      new EncryptAdapter().adapt()
    )

    return new CreateUserUseCase(
      uuidUseCase,
      orm.userRepository,
      encryptUseCase
    )
  }
}