import { IUseCase } from "@/domain/interfaces";
import {
  ConfirmUserRegistrationInputDTO,
  ConfirmUserRegistrationOutputDTO,
} from "@/app/use-cases/user";
import { badRequest } from "@/app/errors/errors";
import { IUserRepository, Result } from "@/domain/contracts";
import { UUID } from "@/domain/value-objects";

export interface IConfirmUserRegistrationUseCase
  extends IUseCase<
    ConfirmUserRegistrationInputDTO,
    ConfirmUserRegistrationOutputDTO
  > {}
export class ConfirmUserRegistrationUseCase
  implements IConfirmUserRegistrationUseCase
{
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(
    confirmRegistrationInput: ConfirmUserRegistrationInputDTO
  ): Promise<Result<ConfirmUserRegistrationOutputDTO>> {
    const { id } = confirmRegistrationInput;

    const userEntity = await this.userRepository.findOne({
      id: new UUID(id),
    });

    if (!userEntity) {
      return Result.fail(badRequest("user not found"));
    }

    userEntity.confirmRegistration();

    await this.userRepository.update(userEntity);
    return Result.ok();
  }
}
