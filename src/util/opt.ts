import MailService from '@src/services/mailService';
import { MailInterface } from './interfaces';

const emailBody = (otpCode: string): string => `<h1>Please confirm your OTP</h1>
<p>Here is your OTP code: ${otpCode}</p>`;

export async function sendOTP(
    email: string,
    otp: string): Promise<void> {
    try {

        const mailService = MailService.getInstance();
        mailService.createConnection();

        const options: MailInterface = {
            from: '',
            to: email,
            subject: 'Verification Email',
            text: emailBody(otp),
            html: '',
        };
        const mailResponse = await mailService.sendMail(options);

        console.log('Email sent successfully: ', mailResponse);
    } catch (error) {
        console.log('Error occurred while sending email: ', error);
        throw error;
    }
}