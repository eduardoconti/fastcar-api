import { UserRepository } from "@/app/use-cases/user/user-repository";
import { User } from "@/domain/entities";

import { IRepository } from "@/domain/interfaces";
import { CreateUser, ICreateUser } from "@/domain/use-cases/user";
import { UserModel } from "@/infra/models";
import { Repository } from "@/infra/orm/adapters/repository.adapter";
import { UuidFactory } from "../uuid";

export class CreateUserFactory {

  static build(): ICreateUser {
    return new CreateUser(
      UuidFactory.build(),
      new UserRepository(
        new Repository().adapt(typeof User) as IRepository<UserModel>
      )
    )
  }
}