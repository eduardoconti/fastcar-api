import { unauthorized } from "@/app/errors/errors";
import { IEncrypter, IJwtService, IUserRepository } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import {  BaseErrorDTO } from "@/domain/entities/error.entity";
import { IUseCase } from "@/domain/interfaces";


export class AuthUseCase implements IUseCase<AuthUseCase.Input, Result<AuthUseCase.Output>>{

  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly compareHash: IEncrypter) {

  }
  async execute(request: AuthUseCase.Input): Promise<Result<AuthUseCase.Output>> {
    const user = await this.userRepository.findUnique({
      where: { login: request.login }
    })
    if (!user) {
      return Result.fail(unauthorized('Usuário não encontrado!'))
    }
    const hashCompareResult = await this.compareHash.compare(
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