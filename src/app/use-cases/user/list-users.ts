import { IUserRepository } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { ListUser } from "./list-user.dto";

export class ListUserUseCase implements IUseCase<ListUser.Input, Result<ListUser.Output[]>> {
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