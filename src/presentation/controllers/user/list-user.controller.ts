import { IController } from "@app/interfaces";
import { IListUserUseCase, ListUserOutput } from "@app/use-cases/user";

export type IListUserController = IController<ListUserOutput[]>;
export class ListUserController implements IListUserController {
   constructor(private readonly listUserUseCase: IListUserUseCase) {}

   async handle() {
      return await this.listUserUseCase.execute();
   }
}
