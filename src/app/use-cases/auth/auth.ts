import { badRequest, unauthorized } from "@/app/errors/errors";
import { IEncrypter, IJwtService } from "@/app/interfaces";
import { IUserRepository, Result } from "@/domain/contracts";
import { User, UserProps } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";

export interface IAuthUseCase extends IUseCase<AuthUseCase.Input, AuthUseCase.Output> { }
export class AuthUseCase implements IAuthUseCase {

  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository<User, UserProps>,
    private readonly encripter: IEncrypter) {
  }

  async execute(request: AuthUseCase.Input): Promise<Result<AuthUseCase.Output>> {
    if (!request.login)
      return Result.fail(badRequest('o campo login é obrigatório!'))

    if (!request.password)
      return Result.fail(badRequest('o campo password é obrigatório!'))

    const user = await this.userRepository.findOne({
      login: request.login
    })

    if (!user)
      return Result.fail(unauthorized('Usuário não encontrado!'))

    const hashCompareResult = await this.encripter.compare(
      request.password,
      user.props.password
    )

    if (!hashCompareResult)
      return Result.fail(unauthorized('Falha de autenticação!'))

    return Result.ok({
      token: await this.jwtService.sign<AuthUseCase.TokenPayload>({
        userId: user.id
      })
    })
  }
}

export namespace AuthUseCase {

  export type Input = {
    login: string,
    password: string
  }

  export type Output = { token: string }

  export type TokenPayload = {
    userId: string,
  }
}