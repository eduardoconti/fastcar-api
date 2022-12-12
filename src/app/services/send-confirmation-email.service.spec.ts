import { IEmailService } from "../interfaces";

import {
   ISendConfirmationEmailService,
   SendConfirmationEmailService,
} from "./send-confirmation-email.service";

const makeEmailServiceStub = (): IEmailService => {
   class MakeEmailServiceStub implements IEmailService {
      send(): void {
         return; 
      }
   }
   return new MakeEmailServiceStub();
};

interface SutTypes {
   sut: ISendConfirmationEmailService;
   emailServiceStub: IEmailService;
}

const makeSut = (): SutTypes => {
   const emailServiceStub = makeEmailServiceStub();
   const sut = new SendConfirmationEmailService(emailServiceStub);
   return {
      sut,
      emailServiceStub,
   };
};
describe("SendConfirmationEmailService", () => {
   const { env } = process;

   beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
   });

   afterEach(() => {
      process.env = env;
   });

   it("should send confirmation email", async () => {
      const { sut, emailServiceStub } = makeSut();
      process.env.HOST = "localhost";
      process.env.MAILER_USER = "fake@email.com";
      jest.spyOn(emailServiceStub, "send").mockReturnValue();
      await sut.sendConfirmationEmail({
         userName: "fakeUserName",
         userEmail: "fake@email.com",
         userId: "fakeUUID",
      });
      expect(emailServiceStub.send).toBeCalledWith(
         expect.objectContaining({
            to: "fake@email.com",
            from: process.env.MAILER_USER,
            subject: "Email Confirmation",
            body: `<h1>Email Confirmation</h1>
      <h2>Hello fakeUserName</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=${process.env.HOST}/user/fakeUUID/confirm> Click here</a>
      </div>`,
            context: "USER CONFIRMATION",
         }),
      );
   });
});
