import { ControllerRequest, IController } from "@/app/interfaces";
import { AuthUseCase, IAuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/contracts";

export type AuthControllerInput = Pick<ControllerRequest<AuthUseCase.Input>, "body">;
export type IAuthController = IController<AuthUseCase.Output>
export class AuthController implements IAuthController {
  constructor(private readonly authUseCase: IAuthUseCase) {}

  async handle(request: AuthControllerInput): Promise<Result<AuthUseCase.Output>> {
    return await this.authUseCase.execute(request.body);
  }
}
