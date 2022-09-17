import { ListUserController } from "@/app/controllers/list-user.controller";
import { ListUserUseCaseFactory } from "@/main/factories/use-cases/user";

export class ListUserControllerFactory {

  build(): ListUserController {
    const listUserUserCase = ListUserUseCaseFactory.build()
    return new ListUserController(
      listUserUserCase
    )
  }
}