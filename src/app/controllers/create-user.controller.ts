import { Result } from "@/domain/entities";
import { CreateUser } from "../use-cases/user";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../use-cases/user";

import { ControllerRequest, IController } from "./controller.interface";

export class CreateUserController implements IController<CreateUserOutputDTO> {

  constructor(private readonly createUser: CreateUser) {
  }
  async handle(request: ControllerRequest): Promise<Result<CreateUserOutputDTO>> {
    return await this.createUser.execute(request.body as CreateUserInputDTO)
  }
}