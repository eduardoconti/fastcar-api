import { badRequestResultDTO, Result, User } from "@/domain/entities";
import { BaseErrorDTO } from "@/domain/entities/error.entity";
import { IUseCase, IUserRepository } from "@/domain/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user";
import { EncryptUseCase } from "../encrypt";
import { Uuid } from "../uuid";

export class CreateUser implements IUseCase<CreateUserInputDTO, Result<CreateUserOutputDTO>> {
  constructor(
    private readonly uuidGenerator: Uuid,
    private readonly userRepository: IUserRepository,
    private readonly encrypter: EncryptUseCase) {
  }

  async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {
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
    const userModel = await this.userRepository.add(User.build({
      id: this.uuidGenerator.execute(),
      ...userEntity,
      password: passwordHashResult.getValue() as string
    }))

    const { id, name, login } = userModel

    return Result.ok({ id, name, login })
  }
}