import { IOrmClient } from "@infra/database/orm/interfaces";
import { ConfirmUserRegistrationUseCaseFactory } from "@main/factories/use-cases/user";
import { ConfirmUserRegistrationController } from "@presentation/controllers/user";

export class ConfirmUserRegistrationControllerFactory {
   static create(orm: IOrmClient): ConfirmUserRegistrationController {
      const confirmUserRegistration =
      ConfirmUserRegistrationUseCaseFactory.create(orm);
      return new ConfirmUserRegistrationController(confirmUserRegistration);
   }
}
