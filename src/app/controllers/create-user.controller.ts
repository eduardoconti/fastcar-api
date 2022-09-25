import { ControllerRequest, IController } from "../interfaces";
import { CreateUserUseCase } from "../use-cases/user";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../use-cases/user";
export class CreateUserController implements IController<CreateUserOutputDTO> {

  constructor(private readonly createUser: CreateUserUseCase) {
  }
  async handle(request: ControllerRequest){
    return await this.createUser.execute(request.body as CreateUserInputDTO)
  }
}