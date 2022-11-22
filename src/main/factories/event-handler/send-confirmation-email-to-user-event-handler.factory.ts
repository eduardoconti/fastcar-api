import { SendConfirmationEmailToUserEventHandler } from "@/app/event-handler";
import { EmailServiceAdpater } from "@/infra/adapters/email-service.adapter";
import { Logger } from "@/infra/logger";

export class SendConfirmationEmailToUserEventHandlerFactory {
  static build(): SendConfirmationEmailToUserEventHandler {
    const emailService = new EmailServiceAdpater().adapt();
    const logger = new Logger("SendConfirmationEmailToUserEventHandler");
    return new SendConfirmationEmailToUserEventHandler(emailService, logger);
  }
}
