import { ConfirmUserRegistrationUseCase } from "@app/use-cases/user";
import { IOrmClient } from "@infra/database/orm/interfaces";

export class ConfirmUserRegistrationUseCaseFactory {
   static create(orm: IOrmClient): ConfirmUserRegistrationUseCase {
      return new ConfirmUserRegistrationUseCase(orm.userRepository);
   }
}
