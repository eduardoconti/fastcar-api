import { ControllerRequest, IController } from "@/app/interfaces";
import {
  ConfirmUserRegistrationInputDTO,
  ConfirmUserRegistrationOutputDTO,
  IConfirmUserRegistrationUseCase,
} from "@/app/use-cases/user";
import { ArgumentInvalidException, BaseException } from "@/domain/exceptions";

export type IConfirmUserRegistrationController =
  IController<ConfirmUserRegistrationOutputDTO>;
export class ConfirmUserRegistrationController
  implements IConfirmUserRegistrationController
{
  constructor(
    private readonly confirmUserRegistration: IConfirmUserRegistrationUseCase
  ) {}
  async handle(
    request: ControllerRequest<undefined, undefined, ConfirmUserRegistrationInputDTO>
  ) {
    if (!request.atributes?.id) {
      throw new ArgumentInvalidException("Invalid controller atributes");
    }
    return await this.confirmUserRegistration.execute({
      id: request.atributes?.id,
    });
  }
}
