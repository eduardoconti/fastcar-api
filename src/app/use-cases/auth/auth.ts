import { badRequest, unauthorized } from "@/app/errors/errors";
import { IEncrypter, IJwtService } from "@/app/interfaces";
import { IUserRepository, Result } from "@/domain/contracts";
import { IUseCase } from "@/domain/interfaces";
import { Email } from "@/domain/value-objects/user";

export type IAuthUseCase = IUseCase<AuthUseCase.Input, AuthUseCase.Output>;
export class AuthUseCase implements IAuthUseCase {
   constructor(
      private readonly jwtService: IJwtService,
      private readonly userRepository: IUserRepository,
      private readonly encripter: IEncrypter,
   ) {}

   async execute(
      request: AuthUseCase.Input,
   ): Promise<Result<AuthUseCase.Output>> {
      const user = await this.userRepository.findOne({
         login: new Email(request.login),
      });

      if (!user) return Result.fail(badRequest("Usuário não encontrado!"));

      if (user.isDisabled())
         return Result.fail(
            unauthorized("Usuário com registro pendente de confirmação!"),
         );

      const hashCompareResult = await this.encripter.compare(
         request.password,
         user.props.password.value,
      );

      if (!hashCompareResult)
         return Result.fail(unauthorized("Falha de autenticação!"));

      return Result.ok({
         token: await this.jwtService.sign<AuthUseCase.TokenPayload>({
            userId: user.id.value,
         }),
      });
   }
}

export namespace AuthUseCase {
   export type Input = {
      login: string;
      password: string;
   };

   export type Output = { token: string };

   export type TokenPayload = {
      userId: string;
   };
}
