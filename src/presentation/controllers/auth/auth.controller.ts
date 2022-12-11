import { AuthControllerInput } from "./auth-input.dto";

import { ControllerRequest, IController } from "@/app/interfaces";
import { AuthUseCase, IAuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/contracts";

export type IAuthController = IController<AuthUseCase.Output>;
export type AuthControllerRequest = Pick<
ControllerRequest<AuthControllerInput>,
"body"
>;
export class AuthController implements IAuthController {
   constructor(private readonly authUseCase: IAuthUseCase) {}

   async handle(
      request: AuthControllerRequest,
   ): Promise<Result<AuthUseCase.Output>> {
      return await this.authUseCase.execute(request.body);
   }
}
