import { IController, UserController } from "@/app/controllers";

import { CreateUserFactory } from "../use-cases/user/create-user.factory";

export class UserControllerFactory {

  static build(): IController {
    return new UserController(
      CreateUserFactory.build()
    )
  }
}