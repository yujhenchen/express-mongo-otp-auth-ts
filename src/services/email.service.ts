import { IEmail } from 'interfaces/email';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class EmailService {

    private static instance: EmailService;
    private transporter: Transporter | null = null;

    private constructor() { }

    public static getInstance(): EmailService {
        if (!EmailService.instance) EmailService.instance = new EmailService();
        return EmailService.instance;
    }

    public createConnection() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST || '',
            port: Number(process.env.SMTP_PORT) || '',
            // Use `true` for port 465, `false` for all other ports
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options);
    }

    public async sendMail(options: IEmail) {
        if (!this.transporter)
            return 'transporter does not exist, please create connection';

        try {
            const response = await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            }) as string;
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    public async sendOTP(
        email: string,
        emailBody: (otpCode: string) => string,
        otp: string): Promise<void> {
        try {
            const mailService = EmailService.getInstance();
            mailService.createConnection();

            const options: IEmail = {
                from: '',
                to: email,
                subject: 'Verification Email',
                text: emailBody(otp),
                html: '',
            };
            const mailResponse = await mailService.sendMail(options);
            console.log('Email sent successfully: ', mailResponse);
        } catch (error) {
            console.error('Error occurred while sending email: ', error);
            throw error;
        }
    }

}

export default EmailService;
