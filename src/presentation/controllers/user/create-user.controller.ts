import { ControllerRequest, IController } from "@/app/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO, ICreateUserUseCase } from "@/app/use-cases/user";

export class CreateUserController implements IController<CreateUserOutputDTO> {

  constructor(private readonly createUser: ICreateUserUseCase) {
  }
  async handle(request: ControllerRequest<CreateUserInputDTO>) {
    return await this.createUser.execute(request.body)
  }
}