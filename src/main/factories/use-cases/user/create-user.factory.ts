

import { EncryptUseCase } from "@/app/use-cases/encrypt";
import { CreateUser } from "@/app/use-cases/user";
import { User } from "@/domain/entities";
import { IRepository } from "@/domain/interfaces";
import { UserModel } from "@/infra/models";
import { Repository } from "@/infra/orm/adapters/repository.adapter";
import { UserRepository } from "@/infra/orm/repositories";
import { BcryptAdapter } from "@/main/adapters";
import { UuidFactory } from "../uuid";

export class CreateUserUseCaseFactory {

  static build(): CreateUser {
    const uuidUseCase = UuidFactory.build();
    const userRepositoryUseCase = new UserRepository(
      new Repository().adapt(typeof User) as IRepository<UserModel>
    )
    const encryptUseCase = new EncryptUseCase(
      BcryptAdapter.adapt()
    )

    return new CreateUser(
      uuidUseCase,
      userRepositoryUseCase,
      encryptUseCase
    )
  }
}