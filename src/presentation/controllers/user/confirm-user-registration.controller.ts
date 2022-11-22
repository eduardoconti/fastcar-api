import { ControllerRequest, IController } from "@/app/interfaces";
import {
  ConfirmUserRegistrationInputDTO,
  ConfirmUserRegistrationOutputDTO,
  IConfirmUserRegistrationUseCase,
} from "@/app/use-cases/user";
import { ArgumentInvalidException, BaseException } from "@/domain/exceptions";

export class ConfirmUserRegistrationController
  implements IController<ConfirmUserRegistrationOutputDTO>
{
  constructor(
    private readonly confirmUserRegistration: IConfirmUserRegistrationUseCase
  ) {}
  async handle(
    request: ControllerRequest<undefined, ConfirmUserRegistrationInputDTO>
  ) {
    console.log(request.params)
    if (!request.params?.id) {
      throw new ArgumentInvalidException("Invalid controller params");
    }
    return await this.confirmUserRegistration.execute({
      id: request.params?.id,
    });
  }
}
