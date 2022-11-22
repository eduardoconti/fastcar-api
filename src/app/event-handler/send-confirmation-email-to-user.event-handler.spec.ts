import { UserStatusEnum } from "@/domain/value-objects/user";
import { Logger } from "@/infra/logger";
import { IEmailService, SendEmailProps } from "../interfaces";
import { SendConfirmationEmailToUserEventHandler } from "./send-confirmation-email-to-user.event-handler";

const makeEmailServiceStub = (): IEmailService => {
  class MakeEmailServiceStub implements IEmailService {
    async send(data: SendEmailProps): Promise<void> {
      Promise.resolve();
    }
  }
  return new MakeEmailServiceStub();
};

interface SutTypes {
  sut: SendConfirmationEmailToUserEventHandler;
  emailServiceStub: IEmailService;
}

const makeSut = (): SutTypes => {
  const emailServiceStub = makeEmailServiceStub();
  const sut = new SendConfirmationEmailToUserEventHandler(emailServiceStub, new Logger());
  return {
    sut,
    emailServiceStub,
  };
};

describe("SendConfirmationEmailToUserEventHandler", () => {
  it("should be defined", () => {
    const { sut, emailServiceStub } = makeSut();
    expect(sut).toBeDefined();
    expect(emailServiceStub).toBeDefined();
  });

  it("should execute successfully", async () => {
    const { sut, emailServiceStub } = makeSut();
    jest.spyOn(emailServiceStub, 'send').mockResolvedValue()
    await sut.handle({
      aggregateId: "fake_id",
      correlationId: "fake_correlation",
      dateOccurred: 20315498,
      id: "some_id",
      login: "teste@email.com",
      name: "user_name",
      status: UserStatusEnum.DISABLED,
    });
    expect(emailServiceStub.send).toBeCalled();
  });
});
