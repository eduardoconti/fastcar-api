import { SendConfirmationEmailToUserEventHandler } from '@app/event-handler';
import { SendConfirmationEmailService } from '@app/services';
import { NodeMailerServiceFactory } from '@infra/factories';
import { Logger } from '@infra/logger';

export class SendConfirmationEmailToUserEventHandlerFactory {
  static create(): SendConfirmationEmailToUserEventHandler {
    const emailService = NodeMailerServiceFactory.create();
    const sendConfirmationEmailService = new SendConfirmationEmailService(
      emailService,
    );
    const logger = new Logger('SendConfirmationEmailToUserEventHandler');
    return new SendConfirmationEmailToUserEventHandler(
      sendConfirmationEmailService,
      logger,
    );
  }
}
