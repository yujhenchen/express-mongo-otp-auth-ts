import UserModel, { IUser } from '@src/models/userModel';
import OtpModel, { IOtp } from '@src/models/otpModel';
import { hash } from 'bcrypt';
import { IReq, IRes } from '@src/routes/types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

async function getHashedPassword(password: string): Promise<string> {
    try {
        return await hash(password, 10);
    } catch (error) {
        console.error(`getHashedPassword: ${error}`);
        return '';
    }
}

export default async function signup(req: IReq<{ user: IUser, otp: IOtp }>,
    res: IRes) {

    try {
        const { user: { name, email, password, role },
            otp: { otp } } = req.body;
        if (!name || !email || !password || !otp) {
            return res.status(HttpStatusCodes.FORBIDDEN).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // check if user exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Find the most recent OTP for the email
        const response = await OtpModel.find({ email })
            .sort({ createdAt: -1 }).limit(1);
        if (response.length !== 1 || otp !== response[0].otp) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }
        // Secure password
        const hashedPassword = await getHashedPassword(password);
        if (!(hashedPassword.length > 0)) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: `Hashing password error for ${password}: `,
            });
        }
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        return res.status(HttpStatusCodes.CREATED).json({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        });
    }
    catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: JSON.stringify(error),
        });
    }
}
