import { Result, User } from "@/domain/entities";
import { CreateUserDTO, ICreateUser, IUserRepository } from "@/domain/use-cases/user";
import { IUuid } from "@/domain/use-cases/uuid";
import { UserModel } from "@/infra/models";

export class CreateUser implements ICreateUser {
  constructor(
    private readonly uuidGenerator: IUuid,
    private readonly userRepository: IUserRepository) {
  }
  async create(user: CreateUserDTO): Promise<Result<UserModel>> {
    const userEntity = User.build(user)
    if (await this.userRepository.findOne({ login: user.login })) {
      return Result.fail({ status: 400, title: 'Bad Request', detail: 'This login belongs to a user' })
    }

    if (!user.confirmPassword) {
      return Result.fail({ status: 400, title: 'Bad Request', detail: 'confirmPassword should be not empty' })
    }
    return Result.ok(await this.userRepository.add(User.build({
      id: this.uuidGenerator.uuidV4(),
      ...userEntity,
    })))
  }
}