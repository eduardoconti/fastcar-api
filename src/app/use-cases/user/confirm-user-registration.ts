import { badRequest } from '@app/errors/errors';
import { IUserRepository, Result } from '@domain/contracts';
import { IUseCase } from '@domain/interfaces';
import { UUID } from '@domain/value-objects';
import { UserPrismaRepository } from '@infra/database/orm/prisma';
import { Inject, Injectable } from '@nestjs/common';

export type ConfirmUserRegistrationInputDTO = {
  id: string;
};
export type ConfirmUserRegistrationOutputDTO = void;

export type IConfirmUserRegistrationUseCase = IUseCase<
  ConfirmUserRegistrationInputDTO,
  ConfirmUserRegistrationOutputDTO
>;
@Injectable()
export class ConfirmUserRegistrationUseCase
  implements IConfirmUserRegistrationUseCase
{
  constructor(
    @Inject(UserPrismaRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    confirmRegistrationInput: ConfirmUserRegistrationInputDTO,
  ): Promise<Result<ConfirmUserRegistrationOutputDTO>> {
    const { id } = confirmRegistrationInput;

    const userEntity = await this.userRepository.findOne({
      id: new UUID(id),
    });

    if (!userEntity) {
      return Result.fail(badRequest('user not found'));
    }

    userEntity.confirmRegistration();

    await this.userRepository.update(userEntity);
    return Result.ok();
  }
}
