import { badRequest } from "@/app/errors/errors";
import { AuthUseCase } from "@/app/use-cases/auth";
import { Result } from "@/domain/entities";
import { ControllerRequest, IController } from "../controller.interface";

type Request = Pick<ControllerRequest<AuthUseCase.Input>, 'body'>
export class AuthController implements IController {
  constructor(private readonly authUseCase: AuthUseCase) {

  }
  async handle(request: Request) {
    if (!request.body?.login) {
      return Result.fail(badRequest('o campo login é obrigatório!'))
    }
    if (!request.body?.password) {
      return Result.fail(badRequest('o campo password é obrigatório!'))
    }
    return await this.authUseCase.execute(request.body)
  }
}
