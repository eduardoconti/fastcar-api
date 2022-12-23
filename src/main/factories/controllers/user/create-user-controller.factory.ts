import { ICommandBus } from "@domain/interfaces";
import { CreateUserController } from "@presentation/controllers/user";

export class CreateUserControllerFactory {
   static create(commandBus: ICommandBus): CreateUserController {
      return new CreateUserController(commandBus);
   }
}
