
import { IOrmClient } from "@/infra/database/orm/interfaces";
import { ListUserUseCaseFactory } from "@/main/factories/use-cases/user";
import { ListUserController } from "@/presentation/controllers/user";

export class ListUserControllerFactory {

  static build(orm: IOrmClient): ListUserController {
    const listUserUserCase = ListUserUseCaseFactory.build(orm)
    return new ListUserController(
      listUserUserCase
    )
  }
}