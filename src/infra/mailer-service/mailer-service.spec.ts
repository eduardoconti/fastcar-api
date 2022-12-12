import { ILogger, ITransporter } from "@app/interfaces";
import { createTransport } from "nodemailer";

import { Logger } from "../logger";

import { MailerService } from "./mailer-service";

jest.mock("nodemailer", () => ({
   createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(null),
   }),
}));

type SutTypes = {
   sut: MailerService;
   transport: ITransporter;
   logger: ILogger;
};

const makeSut = (): SutTypes => {
   const transport = createTransport({
      service: "gmail",
      auth: {
         user: "process.env.MAILER_USER",
         pass: "process.env.MAILER_PAsS",
      },
   });
   const logger = new Logger();
   const sut = new MailerService(transport, logger);
   return {
      sut,
      transport,
      logger,
   };
};

const makeFakeBody = {
   body: "<h1>fakebody</h1>",
   context: "fakeContext",
   from: "fakeFrom@gmail.com",
   subject: "",
   to: "fakeTo@gmail.com",
};
describe("NodeMailerServiceFactory", () => {
   beforeEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
   });
   it("should be execute", () => {
      const { sut, transport, logger } = makeSut();
      jest.spyOn(logger, "info").mockImplementation(() => null);
      sut.send(makeFakeBody);
      expect(transport.sendMail).toBeCalled();
      expect(sut).toBeDefined();
      expect(createTransport).toBeCalledWith({
         service: "gmail",
         auth: {
            user: "process.env.MAILER_USER",
            pass: "process.env.MAILER_PAsS",
         },
      });
      expect(logger.info).toBeCalled();
   });

   it("should be execute with error", () => {
      const { sut, transport, logger } = makeSut();
      jest.spyOn(logger, "info").mockImplementation(() => null);
      jest.spyOn(logger, "error").mockImplementation(() => null);
      jest.spyOn(transport, "sendMail").mockImplementation(() => {
         throw new Error("");
      });
      sut.send(makeFakeBody);
      expect(transport.sendMail).toBeCalled();
      expect(sut).toBeDefined();
      expect(createTransport).toBeCalledWith({
         service: "gmail",
         auth: {
            user: "process.env.MAILER_USER",
            pass: "process.env.MAILER_PAsS",
         },
      });
      expect(logger.error).toBeCalled();
   });
});
