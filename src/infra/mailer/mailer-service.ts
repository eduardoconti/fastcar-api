import { IEmailService, ILogger, ITransporter, SendEmailProps } from "@app/interfaces";

export class MailerService implements IEmailService {
   constructor(
      private readonly transporter: ITransporter,
      private readonly logger: ILogger,
   ) {}

   send(data: SendEmailProps): void {
      const { from, to, subject, body } = data;
      this.logger.info(
         `sending email ${data.context}: ${JSON.stringify({
            to,
            from,
         })}`,
      );
      try {
         this.transporter.sendMail({
            from,
            to,
            subject,
            html: body,
         });
      } catch (error: any) {
         this.logger.error(error);
      }
   }
}
