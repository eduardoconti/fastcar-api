
import { ControllerRequest, IController } from "@app/interfaces";
import { CreateUserOutputDTO, ICreateUserUseCase } from "@app/use-cases/user";

import { CreateUserControllerInput } from "./create-user.controller.dto";

export type ICreateUserController = IController<CreateUserOutputDTO>;
export class CreateUserController implements ICreateUserController {
   constructor(private readonly createUser: ICreateUserUseCase) {}

   async handle(request: ControllerRequest<CreateUserControllerInput>) {
      return await this.createUser.execute(request.body);
   }
}
