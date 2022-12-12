import { IOrmClient } from "@infra/database/orm/interfaces";
import { AuthUseCaseFactory } from "@main/factories/use-cases/auth";
import { AuthController } from "@presentation/controllers/auth";

export class AuthControllerFactory {
   static create(orm: IOrmClient) {
      const authUseCase = AuthUseCaseFactory.create(orm);
      return new AuthController(authUseCase);
   }
}
