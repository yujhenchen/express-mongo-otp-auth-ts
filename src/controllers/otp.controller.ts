import { Request, Response } from 'express';
import status from 'http-status';
import handleErrorResponse from '@/utils/controller.helper';
import { IUser } from '@/interfaces/user';
import User from '@/models/user.model';

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

        res.status(status.OK).json({ message: 'OTP sent' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
