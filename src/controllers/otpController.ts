import { generate } from 'otp-generator';
import OtpModel from '@src/models/otpModel';
import { IReq, IRes } from '@src/routes/types/express/misc';
import { IUser } from '@src/models/userModel';

export async function sendOTP(req: IReq<{ user: IUser }>,
    res: IRes): Promise<IRes> {
    try {
        const { email } = req.body.user;

        const otpCode = generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const otpPayload = { email, otp: otpCode };
        /**
         * Only create OTP code when the codes does not exist
         */
        const foundOTP = OtpModel.findOne({ opt: otpCode });
        if (!foundOTP || Object.keys(foundOTP).length === 0) {
            await OtpModel.create(otpPayload);
        }

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otpCode,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: JSON.stringify(error)
        });
    }
}