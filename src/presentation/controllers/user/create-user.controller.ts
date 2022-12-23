import { RegisterUserCommand } from "@app/command/commands";
import { IController } from "@app/interfaces";
import { ICommandBus } from "@domain/interfaces";

import { CreateUserControllerInput } from "./create-user.controller.dto";

export type ICreateUserController = IController;
export class CreateUserController implements ICreateUserController {
   constructor(private readonly commandBus: ICommandBus) {}

   async handle(request: { body: CreateUserControllerInput }) {
      const { body } = request;
      return await this.commandBus.send(
         new RegisterUserCommand(body.name, body.login, body.password),
      );
   }
}
