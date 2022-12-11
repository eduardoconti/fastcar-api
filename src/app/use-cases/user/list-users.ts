import { ListUser } from "./list-user.dto";

import { IUserRepository, Result } from "@/domain/contracts";
import { IUseCase } from "@/domain/interfaces";

export type IListUserUseCase = IUseCase<ListUser.Input, ListUser.Output[]>;
export class ListUserUseCase implements IListUserUseCase {
   constructor(private readonly userRepository: IUserRepository) {}

   async execute(): Promise<Result<ListUser.Output[]>> {
      const users = await this.userRepository.findMany();

      return Result.ok(
         users?.map(e => {
            const {
               id,
               props: { name, login },
            } = e;
            return { id: id.value, name: name.value, login: login.value };
         }),
      );
   }
}
