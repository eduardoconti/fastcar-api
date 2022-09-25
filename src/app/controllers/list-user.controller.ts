import { IController } from "../interfaces";
import { ListUserUseCase, ListUser } from "../use-cases/user";

export class ListUserController implements IController<ListUser.Output[]> {

  constructor(private readonly listUserUseCase: ListUserUseCase) {
  }
  async handle() {
    return await this.listUserUseCase.execute()
  }
}