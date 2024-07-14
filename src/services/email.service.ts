import { IEmail } from '@interfaces/email';
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
        // change all the process env from using config
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

    public getOtpEmailBody(otp: string): string {
        return `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    }

    public async sendMail(options: IEmail) {
        if (!this.transporter)
            return 'transporter does not exist, please create connection';

        try {
            const response = await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
            }) as string;
            // console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async sendOtpEmail(
        email: string,
        emailBody: (otpCode: string) => string,
        otp: string): Promise<void> {
        try {
            const mailService = EmailService.getInstance();
            mailService.createConnection();

            const sender = process.env.SMTP_SENDER;
            if (!sender) throw new Error('Error, cannot find the sender');

            const options: IEmail = {
                from: sender,
                to: email,
                subject: 'Verification Email',
                text: emailBody(otp),
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
