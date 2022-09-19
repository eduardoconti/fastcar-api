import { ListUserController } from "@/app/controllers/list-user.controller";
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface";
import { ListUserUseCaseFactory } from "@/main/factories/use-cases/user";

export class ListUserControllerFactory {

  static build(orm: IOrmClient): ListUserController {
    const listUserUserCase = ListUserUseCaseFactory.build(orm)
    return new ListUserController(
      listUserUserCase
    )
  }
}