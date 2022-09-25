import { AuthController } from "@/app/controllers/auth";
import { IOrmClient } from "@/infra/database/orm/interfaces";
import { AuthUseCaseFactory } from "@/main/factories/use-cases/auth"

export class AuthControllerFactory {

  static build(orm: IOrmClient) {
    const authUseCase = AuthUseCaseFactory.build(orm);
    return new AuthController(authUseCase)
  }
}