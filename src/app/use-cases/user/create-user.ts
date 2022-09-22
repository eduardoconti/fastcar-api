import { Result, User } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user";
import { IEncrypter, IUserRepository, IUuid } from "@/app/interfaces";
import { badRequest } from "@/app/errors/errors";

export class CreateUserUseCase implements IUseCase<CreateUserInputDTO, Result<CreateUserOutputDTO>> {
  constructor(
    private readonly uuidGenerator: IUuid,
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IEncrypter) {
  }
  async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {

    const userEntity = User.build({ id: this.uuidGenerator.v4(), ...user })

    if (await this.userRepository.findUnique({ where: { login: user.login } })) {
      return Result.fail(badRequest('This login belongs to a user'))
    }

    if (!user.confirmPassword) {
      return Result.fail(badRequest('confirmPassword should be not empty'))
    }

    if (user.confirmPassword !== user.password) {
      return Result.fail(badRequest('As senhas não coincidem'))
    }

    const passwordHashResult = await this.encrypter.hash(user.password, 15)


    await this.userRepository.create({
      data: {
        ...userEntity,
        password: passwordHashResult
      }
    })

    const { id, name, login } = userEntity

    return Result.ok({ id, name, login })
  }
}