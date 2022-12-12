import { ListUserUseCase } from "@app/use-cases/user";
import { IOrmClient } from "@infra/database/orm/interfaces";

export class ListUserUseCaseFactory {
   static build(orm: IOrmClient): ListUserUseCase {
      return new ListUserUseCase(orm.userRepository);
   }
}
