import { CreateUserController } from "@/app/controllers/user"
import { IOrmClient } from "@/infra/database/orm/interfaces"
import { CreateUserUseCaseFactory } from "@/main/factories/use-cases/user"

export class CreateUserControllerFactory {

  static build(orm: IOrmClient): CreateUserController {
    const createUserUseCase = CreateUserUseCaseFactory.build(orm)
    return new CreateUserController(
      createUserUseCase
    )
  }
}