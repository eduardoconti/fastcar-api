import { IController } from "@/app/interfaces";
import { IListUserUseCase, ListUser } from "@/app/use-cases/user";

export type IListUserController = IController<ListUser.Output[]>;
export class ListUserController implements IListUserController {
   constructor(private readonly listUserUseCase: IListUserUseCase) {}

   async handle() {
      return await this.listUserUseCase.execute();
   }
}
