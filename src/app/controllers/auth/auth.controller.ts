import { ControllerRequest, IController } from "@/app/interfaces";
import { AuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/entities";

type Request = Pick<ControllerRequest<AuthUseCase.Input>, 'body'>
export class AuthController implements IController<AuthUseCase.Output> {
  constructor(private readonly authUseCase: AuthUseCase) {
  }
  
  async handle(request: Request): Promise<Result<AuthUseCase.Output>> {
    return await this.authUseCase.execute(request.body as AuthUseCase.Input)
  }
}
