import { IOrmClient } from "@infra/database/orm/interfaces";
import { ListUserUseCaseFactory } from "@main/factories/use-cases/user";
import { ListUserController } from "@presentation/controllers/user";

export class ListUserControllerFactory {
   static create(orm: IOrmClient): ListUserController {
      const listUserUserCase = ListUserUseCaseFactory.create(orm);
      return new ListUserController(listUserUserCase);
   }
}
