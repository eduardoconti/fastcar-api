import { CreateUserControllerInput } from "./create-user.controller.dto";

import { ControllerRequest, IController } from "@/app/interfaces";
import { CreateUserOutputDTO, ICreateUserUseCase } from "@/app/use-cases/user";

export type ICreateUserController = IController<CreateUserOutputDTO>;
export class CreateUserController implements ICreateUserController {
   constructor(private readonly createUser: ICreateUserUseCase) {}

   async handle(request: ControllerRequest<CreateUserControllerInput>) {
      return await this.createUser.execute(request.body);
   }
}
