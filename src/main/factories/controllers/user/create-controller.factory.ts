import { CreateUserController } from "@/app/controllers"
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface"
import { CreateUserUseCaseFactory } from "@/main/factories/use-cases/user"

export class CreateUserControllerFactory {

  static build(orm: IOrmClient): CreateUserController {
    const createUser = CreateUserUseCaseFactory.build(orm)
    return new CreateUserController(
      createUser
    )
  }
}