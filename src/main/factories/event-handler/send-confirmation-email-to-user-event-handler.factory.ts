import { SendConfirmationEmailToUserEventHandler } from "@/app/event-handler";
import { SendConfirmationEmailService } from "@/app/services";
import { EmailServiceAdpater } from "@/infra/adapters/email-service.adapter";
import { Logger } from "@/infra/logger";

export class SendConfirmationEmailToUserEventHandlerFactory {
   static build(): SendConfirmationEmailToUserEventHandler {
      const emailService = new EmailServiceAdpater().adapt();
      const sendConfirmationEmailService = new SendConfirmationEmailService(
         emailService,
      );
      const logger = new Logger("SendConfirmationEmailToUserEventHandler");
      return new SendConfirmationEmailToUserEventHandler(
         sendConfirmationEmailService,
         logger,
      );
   }
}
