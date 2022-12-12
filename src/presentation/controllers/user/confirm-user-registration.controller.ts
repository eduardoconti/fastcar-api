import { ControllerRequest, IController } from "@app/interfaces";
import {
   ConfirmUserRegistrationInputDTO,
   ConfirmUserRegistrationOutputDTO,
   IConfirmUserRegistrationUseCase,
} from "@app/use-cases/user";

export type IConfirmUserRegistrationController =
  IController<ConfirmUserRegistrationOutputDTO>;
export class ConfirmUserRegistrationController
implements IConfirmUserRegistrationController
{
   constructor(
      private readonly confirmUserRegistration: IConfirmUserRegistrationUseCase,
   ) {}

   async handle(
      request: Required<
      Pick<
      ControllerRequest<
      undefined,
      undefined,
      ConfirmUserRegistrationInputDTO
      >,
      "atributes"
      >
      >,
   ) {
      return await this.confirmUserRegistration.execute({
         id: request.atributes.id,
      });
   }
}
