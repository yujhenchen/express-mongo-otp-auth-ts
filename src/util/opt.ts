import { mailSender } from './emailHelper';

const emailBody = (otpCode: string): string => `<h1>Please confirm your OTP</h1>
<p>Here is your OTP code: ${otpCode}</p>`;

export async function sendOTP(
    email: string,
    otp: string): Promise<void> {
    try {
        const mailResponse = await mailSender(
            email,
            'Verification Email',
            emailBody(otp)
        );
        console.log('Email sent successfully: ', mailResponse);
    } catch (error) {
        console.log('Error occurred while sending email: ', error);
        throw error;
    }
}