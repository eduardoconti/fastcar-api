import { DomainEventHandler } from "@/domain/domain-events";
import { UserRegisteredDomainEvent } from "@/domain/events/user-registered.domain-event";
import { IEmailService, ILogger } from "../interfaces";

export class SendConfirmationEmailToUserEventHandler extends DomainEventHandler {
  constructor(
    private readonly emailService: IEmailService,
    private readonly logger: ILogger
  ) {
    super(UserRegisteredDomainEvent);
  }

  async handle(event: UserRegisteredDomainEvent): Promise<void> {
    this.logger.info(JSON.stringify(event));
    const { login, name, aggregateId } = event;
    await this.emailService.send({
      to: login,
      from: process.env.MAILER_USER as string,
      subject: "Email Confirmation",
      body: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=${process.env.HOST}/user/${aggregateId}/confirm> Click here</a>
      </div>`,
      context: "USER CONFIRMATION",
    });
  }
}
