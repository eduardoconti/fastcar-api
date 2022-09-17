
import { ListUser, ListUserUseCase } from "@/app/use-cases/user";
import {OrmClientAdapter } from "@/main/adapters";

export class ListUserUseCaseFactory {

  static build(): ListUserUseCase {
    const orm = new OrmClientAdapter().adapt()

    return new ListUserUseCase(
      orm.userRepository,
    )
  }
}