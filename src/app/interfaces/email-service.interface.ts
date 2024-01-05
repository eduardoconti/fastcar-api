export type SendEmailProps = {
   from: string;
   to: string;
   subject: string;
   body: string;
   context: string;
};
export interface IEmailService {
   send(data: SendEmailProps): Promise<void>;
}

export type SendMailTransporterProps = {
   from: string;
   to: string;
   subject: string;
   html: string;
};
export interface ITransporter {
   sendMail(data: SendMailTransporterProps): void;
}
