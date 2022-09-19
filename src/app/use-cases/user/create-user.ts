import { badRequestResultDTO, Result, User } from "@/domain/entities";
import { BaseErrorDTO } from "@/domain/entities/error.entity";
import { IUseCase, IUserRepository } from "@/domain/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user";
import { EncryptUseCase } from "../encrypt";
import { UuidUseCase } from "../uuid";

export class CreateUserUseCase implements IUseCase<CreateUserInputDTO, Result<CreateUserOutputDTO>> {
  constructor(
    private readonly uuidGenerator: UuidUseCase,
    private readonly userRepository: IUserRepository,
    private readonly encrypter: EncryptUseCase) {
  }
  async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {

    const userEntity = User.build({ id: this.uuidGenerator.execute(), ...user })

    if (await this.userRepository.findUnique({ where: { login: user.login } })) {
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

    await this.userRepository.create({
      data: {
        ...userEntity,
        password: passwordHashResult.getValue() as string
      }
    })

    const { id, name, login } = userEntity

    return Result.ok({ id, name, login })
  }
}