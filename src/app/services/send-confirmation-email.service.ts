import { IEmailService } from '../interfaces';

export type SendConfirmationEmailProps = {
  userEmail: string;
  userName: string;
  userId: string;
};

export interface ISendConfirmationEmailService {
  sendConfirmationEmail(props: SendConfirmationEmailProps): Promise<void>;
}

export class SendConfirmationEmailService
  implements ISendConfirmationEmailService
{
  constructor(private readonly emailService: IEmailService) {}

  async sendConfirmationEmail(
    props: SendConfirmationEmailProps,
  ): Promise<void> {
    const { userEmail, userName, userId } = props;
    this.emailService.send({
      to: userEmail,
      from: process.env.MAILER_USER as string,
      subject: 'Email Confirmation',
      body: `<h1>Email Confirmation</h1>
      <h2>Hello ${userName}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=${process.env.HOST}/user/${userId}/confirm> Click here</a>
      </div>`,
      context: 'USER CONFIRMATION',
    });
  }
}
