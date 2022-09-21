import { unauthorized } from "@/app/errors/errors";
import { IJwtService, IUserRepository } from "@/app/interfaces";
import { Result } from "@/domain/entities";
import { BaseError, BaseErrorDTO } from "@/domain/entities/error.entity";
import { IUseCase } from "@/domain/interfaces";
import { CompareHashUseCase } from "@/infra/encrypt";

export class AuthUseCase implements IUseCase<AuthUseCase.Input, Result<AuthUseCase.Output>>{

  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly compareHash: CompareHashUseCase) {

  }
  async execute(request: AuthUseCase.Input): Promise<Result<AuthUseCase.Output>> {
    const user = await this.userRepository.findUnique({
      where: { login: request.login }
    })
    if (!user) {
      return Result.fail(unauthorized('Login ou senha inválidos!'))
    }
    const hashCompareResult = await this.compareHash.execute({
      text: request.password,
      hash: user.password
    })
    if (hashCompareResult.isFailure) {
      return Result.fail(hashCompareResult.error as BaseErrorDTO)
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