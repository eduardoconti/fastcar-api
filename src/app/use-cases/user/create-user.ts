import { User, UserProps } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";
import { CreateUserInputDTO, CreateUserOutputDTO } from "@/app/use-cases/user";
import { IEncrypter, IUserRepository } from "@/app/interfaces";
import { badRequest } from "@/app/errors/errors";
import { Result } from "@/domain/contracts";
import { Email, Name, Password } from "@/domain/value-objects/user";
import { UserModel } from "@/infra/database/models";

export interface ICreateUserUseCase extends IUseCase<CreateUserInputDTO, CreateUserOutputDTO> { }
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypter: IEncrypter) {
  }
  async execute(user: CreateUserInputDTO): Promise<Result<CreateUserOutputDTO>> {
    const { name, login, password, confirmPassword } = user
    const loginVO = new Email(login)
    const userEntity = User.create(
      {
        name: new Name(name),
        login: loginVO,
        password: new Password(password)
      })

    if (!confirmPassword)
      return Result.fail(badRequest('confirmPassword should be not empty'))

    if (await this.userRepository.findOne({ login: loginVO }))
      return Result.fail(badRequest('This login belongs to a user'))

    if (confirmPassword !== password)
      return Result.fail(badRequest('As senhas não coincidem'))

    const passwordHashResult = await this.encrypter.hash(password)

    userEntity.updatePassword(passwordHashResult)

    await this.userRepository.save(userEntity)

    return Result.ok({ id: userEntity.id.value, name, login })
  }
}