
import { IController } from "@app/interfaces";
import { AuthUseCase, IAuthUseCase } from "@app/use-cases/auth";
import { Result } from "@domain/contracts";

import { AuthControllerInput } from "./auth-input.dto";


export type IAuthController = IController<AuthUseCase.Output>;
export type AuthControllerRequest = {
   body: AuthControllerInput;
};
export class AuthController implements IAuthController {
   constructor(private readonly authUseCase: IAuthUseCase) {}

   async handle(
      request: AuthControllerRequest,
   ): Promise<Result<AuthUseCase.Output>> {
      return await this.authUseCase.execute(request.body);
   }
}
