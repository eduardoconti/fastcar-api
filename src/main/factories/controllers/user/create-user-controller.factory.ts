import { IOrmClient } from "@infra/database/orm/interfaces";
import { CreateUserUseCaseFactory } from "@main/factories/use-cases/user";
import { CreateUserController } from "@presentation/controllers/user";

export class CreateUserControllerFactory {
   static create(orm: IOrmClient): CreateUserController {
      const createUserUseCase = CreateUserUseCaseFactory.create(orm);
      return new CreateUserController(createUserUseCase);
   }
}
