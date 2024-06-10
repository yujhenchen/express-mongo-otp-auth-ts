import { MailInterface } from '@src/util/interfaces';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailService {

    private static instance: MailService;
    private transporter: Transporter | null = null;

    private constructor() { }

    public static getInstance(): MailService {
        if (!MailService.instance) MailService.instance = new MailService();
        return MailService.instance;
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

    public async sendMail(options: MailInterface) {
        if (!this.transporter)
            return 'transporter does not exist, please create connection';

        try {
            const response = await this.transporter.sendMail({
                from: `"userName" ${process.env.SMTP_SENDER || options.from}`,
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
            console.log(error);
            return '';
        }
    }
}

export default MailService;
