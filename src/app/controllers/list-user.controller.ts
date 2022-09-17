import { ListUserUseCase, ListUser } from "../use-cases/user";


import { IController } from "./controller.interface";

export class ListUserController implements IController<ListUser.Output[]> {

  constructor(private readonly listUserUseCase: ListUserUseCase) {
  }
  async handle() {
    return await this.listUserUseCase.execute()
  }
}