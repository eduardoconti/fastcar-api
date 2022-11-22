import { IAdapter, IEmailService } from "@/app/interfaces";
import { createTransport } from "nodemailer";
import { NodeMailer } from "../email-service";
import { Logger } from "../logger";

export class EmailServiceAdpater implements IAdapter<IEmailService> {
  adapt(): IEmailService {
    let transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });
    const logger = new Logger('EmailService');
    return new NodeMailer(transporter, logger);
  }
}
