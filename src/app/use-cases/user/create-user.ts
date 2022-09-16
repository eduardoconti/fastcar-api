import { badRequestResultDTO, Result, User } from "@/domain/entities";
import { BaseErrorDTO } from "@/domain/entities/error.entity";
import { IUseCase } from "@/domain/interfaces";
import { CreateUserDTO, IUserRepository } from "@/domain/use-cases/user";
import { IUuid } from "@/domain/use-cases/uuid";
import { UserModel } from "@/infra/models";
import { EncryptUseCase } from "../encrypt";

export class CreateUser implements IUseCase<CreateUserDTO, Result<UserModel>> {
  constructor(
    private readonly uuidGenerator: IUuid,
    private readonly userRepository: IUserRepository,
    private readonly encrypter: EncryptUseCase) {
  }

  async execute(user: CreateUserDTO): Promise<Result<UserModel>> {
    const userEntity = User.build(user)
    if (await this.userRepository.findOne({ login: user.login })) {
      return Result.fail(badRequestResultDTO('This login belongs to a user'))
    }

    if (!user.confirmPassword) {
      return Result.fail(badRequestResultDTO('confirmPassword should be not empty'))
    }
    if (user.confirmPassword !== user.password) {
      return Result.fail(badRequestResultDTO('As senhas não coincidem'))
    }
    const passwordHashResult = await this.encrypter.execute(user.password)
    if (passwordHashResult.isFailure) {
      return Result.fail(passwordHashResult.error as BaseErrorDTO)
    }
    return Result.ok(await this.userRepository.add(User.build({
      id: this.uuidGenerator.uuidV4(),
      ...userEntity,
      password: passwordHashResult.getValue() as string
    })))
  }
}