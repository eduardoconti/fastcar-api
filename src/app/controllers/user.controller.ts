import { Result, User } from "@/domain/entities";
import { ICreateUser } from "@/domain/use-cases/user";
import { UserModel } from "@/infra/models";
import { ControllerRequest, IController } from "./controller.interface";

export class UserController implements IController {

  constructor(private readonly createUser: ICreateUser) {
  }
  async handle(request: ControllerRequest): Promise<Result<UserModel>> {
    const { body } = request
    return await this.createUser.create(body)
  }
}