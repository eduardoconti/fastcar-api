import { IOrmClient } from "@infra/database/orm/interfaces";
import { AuthUseCaseFactory } from "@main/factories/use-cases/auth";
import { AuthController } from "@presentation/controllers/auth";

export class AuthControllerFactory {
   static build(orm: IOrmClient) {
      const authUseCase = AuthUseCaseFactory.build(orm);
      return new AuthController(authUseCase);
   }
}
