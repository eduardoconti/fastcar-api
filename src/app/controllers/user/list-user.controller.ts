import { IController } from "@/app/interfaces";
import { IListUserUseCase, ListUser, ListUserUseCase } from "@/app/use-cases/user";


export class ListUserController implements IController<ListUser.Output[]> {

  constructor(private readonly listUserUseCase: IListUserUseCase) {
  }
  async handle() {
    return await this.listUserUseCase.execute()
  }
}