import { badRequest } from "@/app/errors/errors";
import { AuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/entities";
import { ControllerRequest, IController } from "../controller.interface";

type Request = Pick<ControllerRequest<AuthUseCase.Input>, 'body'>
export class AuthController implements IController<AuthUseCase.Output> {
  constructor(private readonly authUseCase: AuthUseCase) {
  }
  
  async handle(request: Request): Promise<Result<AuthUseCase.Output>> {
    return await this.authUseCase.execute(request.body as AuthUseCase.Input)
  }
}
