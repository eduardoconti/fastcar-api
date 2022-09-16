import { UserController } from "@/app/controllers";

import { CreateUserFactory } from "../use-cases/user/create-user.factory";

export class UserControllerFactory {

  static build(): UserController {
    return new UserController(
      CreateUserFactory.build()
    )
  }
}