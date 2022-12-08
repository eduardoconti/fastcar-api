import { DomainEventHandler } from "@/domain/domain-events";
import { UserRegisteredDomainEvent } from "@/domain/events";
import { ILogger } from "../interfaces";
import { ISendConfirmationEmailService } from "../services";

export class SendConfirmationEmailToUserEventHandler extends DomainEventHandler {
  constructor(
    private readonly emailService: ISendConfirmationEmailService,
    private readonly logger: ILogger
  ) {
    super(UserRegisteredDomainEvent);
  }

  async handle(event: UserRegisteredDomainEvent): Promise<void> {
    this.logger.info(JSON.stringify(event));
    const { login, name, aggregateId } = event;
    await this.emailService.sendConfirmationEmail({
      userEmail: login,
      userName: name,
      userId: aggregateId,
    });
  }
}
