import {
  ConfirmUserRegistrationOutputDTO,
  IConfirmUserRegistrationUseCase,
} from '@app/use-cases/user';
import { Result } from '@domain/contracts';

import { ConfirmUserRegistrationController } from './confirm-user-registration.controller';

const makeConfirmUserRegistrationUseCaseStub =
  (): IConfirmUserRegistrationUseCase => {
    class ConfirmUserRegistrationUseCaseStub
      implements IConfirmUserRegistrationUseCase
    {
      async execute(): Promise<Result<ConfirmUserRegistrationOutputDTO>> {
        return Result.ok();
      }
    }
    return new ConfirmUserRegistrationUseCaseStub();
  };

interface SutTypes {
  sut: ConfirmUserRegistrationController;
  confirmUserRegistrationUseCaseStub: IConfirmUserRegistrationUseCase;
}

const makeSut = (): SutTypes => {
  const confirmUserRegistrationUseCaseStub =
    makeConfirmUserRegistrationUseCaseStub();
  const sut = new ConfirmUserRegistrationController(
    confirmUserRegistrationUseCaseStub,
  );
  return {
    sut,
    confirmUserRegistrationUseCaseStub,
  };
};
describe('Confirme user registration controller', () => {
  it('should execute controller', async () => {
    const { sut, confirmUserRegistrationUseCaseStub } = makeSut();
    jest
      .spyOn(confirmUserRegistrationUseCaseStub, 'execute')
      .mockReturnValue(Result.ok());

    await sut.handle('58daf3da-aa8d-4dab-b226-b41d10091348');
    expect(confirmUserRegistrationUseCaseStub.execute).toBeCalledTimes(1);
  });
});
