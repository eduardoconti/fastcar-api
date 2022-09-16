import { CreateUserController } from "@/app/controllers"
import { CreateUserUseCaseFactory } from "@/main/factories/use-cases/user"

export class CreateUserControllerFactory {

  static build(): CreateUserController {
    return new CreateUserController(
      CreateUserUseCaseFactory.build()
    )
  }
}