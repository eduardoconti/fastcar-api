import { badRequest, unauthorized } from "@/app/errors/errors";
import { IEncrypter, IJwtService, IUserRepository } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import { IUseCase } from "@/domain/interfaces";

export interface IAuthUseCase extends IUseCase<AuthUseCase.Input, Result<AuthUseCase.Output>> { }
export class AuthUseCase implements IAuthUseCase {

  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly encripter: IEncrypter) {
  }
  
  async execute(request: AuthUseCase.Input): Promise<Result<AuthUseCase.Output>> {
    if (!request.login) {
      return Result.fail(badRequest('o campo login é obrigatório!'))
    }
    if (!request.password) {
      return Result.fail(badRequest('o campo password é obrigatório!'))
    }
    const user = await this.userRepository.findUnique({
      where: { login: request.login }
    })
    if (!user) {
      return Result.fail(unauthorized('Usuário não encontrado!'))
    }
    const hashCompareResult = await this.encripter.compare(
      request.password,
      user.password
    )
    if (!hashCompareResult) {
      return Result.fail(unauthorized('Falha de autenticação!'))
    }
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