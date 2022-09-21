import { AuthController } from "@/app/controllers/auth/auth.controller";
import { IOrmClient } from "@/infra/database/orm/interfaces/orm-client.interface";
import { AuthUseCaseFactory } from "../../use-cases/auth";

export class AuthControllerFactory {

  static build(orm: IOrmClient) {
    const authUseCase = AuthUseCaseFactory.build(orm);
    return new AuthController(authUseCase)
  }
}