import { Request, Response } from 'express';
import status from 'http-status';
import otpGenerator from 'otp-generator';
import handleErrorResponse from '@/utils/controller.helper';
import { IUser } from '@/interfaces/user';
import User from '@/models/user.model';
import OTP from '@/models/opt.model';
import { IOtpDoc } from '@/interfaces/otp';

export async function sendOTP(
    req: Request<Record<string, never>, Record<string, never>, Pick<IUser, 'email'>, Record<string, never>>,
    res: Response) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(status.NOT_FOUND).json({ message: `User Not found. User email: ${email}` });
            return;
        }

        let otp: string | null;
        let foundOTP: IOtpDoc | null;
        do {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            foundOTP = await OTP.findOne({ otp }).exec();
        } while (foundOTP);

        /**
         *  TODO: 
         *  - insert OTP into database
         *  - send OTP email ??
         *  - return response
         */

        res.status(status.OK).json({ message: 'OTP sent' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
