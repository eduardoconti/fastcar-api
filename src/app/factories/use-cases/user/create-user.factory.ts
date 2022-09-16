
import { EncryptUseCase } from "@/app/use-cases/encrypt";

import { User } from "@/domain/entities";

import { IRepository } from "@/domain/interfaces";
import { CreateUser } from "@/domain/use-cases/user";
import { UserModel } from "@/infra/models";
import { Repository } from "@/infra/orm/adapters/repository.adapter";
import { UserRepository } from "@/infra/orm/repositories";
import { UuidFactory } from "../uuid";

export class CreateUserFactory {

  static build(): CreateUser {
    return new CreateUser(
      UuidFactory.build(),
      new UserRepository(
        new Repository().adapt(typeof User) as IRepository<UserModel>
      ),
      new EncryptUseCase()
    )
  }
}