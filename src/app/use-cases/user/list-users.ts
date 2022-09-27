import { IUserRepository } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { ListUser } from "./list-user.dto";

export interface IListUserUseCase extends IUseCase<ListUser.Input, Result<ListUser.Output[]>> { }
export class ListUserUseCase implements IListUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) {
  }

  async execute(): Promise<Result<ListUser.Output[]>> {

    const users = await this.userRepository.find()
    return Result.ok(users?.map((e) => {
      const { id, name, login } = e
      return { id, name, login }
    }))
  }
}