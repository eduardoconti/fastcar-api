import { ConfirmUserRegistrationController } from "@/presentation/controllers/user"
import { IOrmClient } from "@/infra/database/orm/interfaces"
import { ConfirmUserRegistrationUseCaseFactory } from "@/main/factories/use-cases/user"

export class ConfirmUserRegistrationControllerFactory {

  static build(orm: IOrmClient): ConfirmUserRegistrationController {
    const confirmUserRegistration = ConfirmUserRegistrationUseCaseFactory.build(orm)
    return new ConfirmUserRegistrationController(
      confirmUserRegistration
    )
  }
}