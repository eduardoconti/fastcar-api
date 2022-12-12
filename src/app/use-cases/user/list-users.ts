import { IUserRepository, Result } from "@domain/contracts";
import { IUseCase } from "@domain/interfaces";

export type ListUserInput = {
   id?: string;
   name?: string;
   login?: string;
};
export type ListUserOutput = {
   id: string;
   name: string;
   login: string;
};

export type IListUserUseCase = IUseCase<ListUserInput, ListUserOutput[]>;
export class ListUserUseCase implements IListUserUseCase {
   constructor(private readonly userRepository: IUserRepository) {}

   async execute(): Promise<Result<ListUserOutput[]>> {
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
