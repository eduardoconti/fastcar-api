
import { ListUserController } from "@/app/controllers";
import { IOrmClient } from "@/infra/database/orm/interfaces";
import { ListUserUseCaseFactory } from "@/main/factories/use-cases/user";

export class ListUserControllerFactory {

  static build(orm: IOrmClient): ListUserController {
    const listUserUserCase = ListUserUseCaseFactory.build(orm)
    return new ListUserController(
      listUserUserCase
    )
  }
}