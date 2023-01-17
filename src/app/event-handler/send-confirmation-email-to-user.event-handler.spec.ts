import { UserStatusEnum } from '@domain/value-objects/user';
import { Logger } from '@infra/logger';

import { ISendConfirmationEmailService } from '../services';

import { SendConfirmationEmailToUserEventHandler } from './send-confirmation-email-to-user.event-handler';

const makeSendConfirmationEmailServiceStub =
  (): ISendConfirmationEmailService => {
    class MakeSendConfirmationEmailServiceStub
      implements ISendConfirmationEmailService
    {
      async sendConfirmationEmail(): Promise<void> {
        Promise.resolve();
      }
    }
    return new MakeSendConfirmationEmailServiceStub();
  };

interface SutTypes {
  sut: SendConfirmationEmailToUserEventHandler;
  emailServiceStub: ISendConfirmationEmailService;
}

const makeSut = (): SutTypes => {
  const emailServiceStub = makeSendConfirmationEmailServiceStub();
  const sut = new SendConfirmationEmailToUserEventHandler(
    emailServiceStub,
    new Logger(),
  );
  sut.listen();
  return {
    sut,
    emailServiceStub,
  };
};

describe('SendConfirmationEmailToUserEventHandler', () => {
  it('should be defined', () => {
    const { sut, emailServiceStub } = makeSut();
    expect(sut).toBeDefined();
    expect(emailServiceStub).toBeDefined();
  });

  it('should execute successfully', async () => {
    const { sut, emailServiceStub } = makeSut();
    jest.spyOn(emailServiceStub, 'sendConfirmationEmail').mockResolvedValue();
    await sut.handle({
      aggregateId: 'fake_id',
      correlationId: 'fake_correlation',
      dateOccurred: 20315498,
      id: 'some_id',
      login: 'teste@email.com',
      name: 'user_name',
      status: UserStatusEnum.DISABLED,
    });
    expect(emailServiceStub.sendConfirmationEmail).toBeCalled();
  });
});
