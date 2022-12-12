import { ControllerRequest, IController } from "@app/interfaces";
import { CreateUserOutput, ICreateUserUseCase } from "@app/use-cases/user";

import { CreateUserControllerInput } from "./create-user.controller.dto";

export type ICreateUserController = IController<CreateUserOutput>;
export class CreateUserController implements ICreateUserController {
   constructor(private readonly createUser: ICreateUserUseCase) {}

   async handle(request: ControllerRequest<CreateUserControllerInput>) {
      return await this.createUser.execute(request.body);
   }
}
