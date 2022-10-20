import { IUserRepository, Result } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { ListUser } from "./list-user.dto";

export interface IListUserUseCase extends IUseCase<ListUser.Input, ListUser.Output[]> { }
export class ListUserUseCase implements IListUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository<User, UserProps>
  ) {
  }

  async execute(): Promise<Result<ListUser.Output[]>> {

    const users = await this.userRepository.findMany()

    return Result.ok(users?.map((e) => {
      const { id, props: { name, login } } = e
      return { id, name, login }
    }))
  }
}