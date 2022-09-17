import { CreateUserController } from "@/app/controllers"
import { CreateUserUseCaseFactory } from "@/main/factories/use-cases/user"

export class CreateUserControllerFactory {

  build(): CreateUserController {
    const createUser = CreateUserUseCaseFactory.build()
    return new CreateUserController(
      createUser
    )
  }
}