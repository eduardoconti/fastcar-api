import { User, UserProps } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user";
import { IEncrypter } from "@/app/interfaces";
import { badRequest } from "@/app/errors/errors";
import { IUserRepository, Result } from "@/domain/contracts";

export interface ICreateUserUseCase extends IUseCase<CreateUserInputDTO, CreateUserOutputDTO> { }
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository<User, UserProps>,
    private readonly encrypter: IEncrypter) {
  }
  async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {
    const { name, login, password, confirmPassword } = user
    const userEntity = User.build({ name, login, password })

    if (!confirmPassword)
      return Result.fail(badRequest('confirmPassword should be not empty'))

    if (await this.userRepository.findOne({ login }))
      return Result.fail(badRequest('This login belongs to a user'))

    if (confirmPassword !== password)
      return Result.fail(badRequest('As senhas não coincidem'))

    const passwordHashResult = await this.encrypter.hash(password)

    userEntity.updatePassword(passwordHashResult)

    await this.userRepository.save(userEntity)

    return Result.ok({ id: userEntity.id, name, login })
  }
}