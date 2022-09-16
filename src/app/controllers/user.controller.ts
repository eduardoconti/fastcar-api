import { Result, User } from "@/domain/entities";
import { CreateUser, CreateUserDTO } from "@/domain/use-cases/user";
import { UserModel } from "@/infra/models";
import { ControllerRequest, IController } from "./controller.interface";

export class UserController implements IController<UserModel> {

  constructor(private readonly createUser: CreateUser) {
  }
  async handle(request?: ControllerRequest): Promise<Result<UserModel>> {
    return await this.createUser.execute(request?.body as CreateUserDTO)
  }
}