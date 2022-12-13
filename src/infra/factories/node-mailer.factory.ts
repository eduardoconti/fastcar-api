import { IEmailService } from "@app/interfaces";
import { MailerService } from "@infra/mailer";
import { createTransport } from "nodemailer";

import { Logger } from "../logger";

export class NodeMailerServiceFactory {
   static create(): IEmailService {
      const transporter = createTransport({
         service: "gmail",
         auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
         },
      });
      const logger = new Logger("EmailService");

      return new MailerService(transporter, logger);
   }
}
