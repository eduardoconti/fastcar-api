import { ConfirmUserRegistrationUseCase } from "@/app/use-cases/user";
import { IOrmClient } from "@/infra/database/orm/interfaces";

export class ConfirmUserRegistrationUseCaseFactory {
   static build(orm: IOrmClient): ConfirmUserRegistrationUseCase {
      return new ConfirmUserRegistrationUseCase(orm.userRepository);
   }
}
