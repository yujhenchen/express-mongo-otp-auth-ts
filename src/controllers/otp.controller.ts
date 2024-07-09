import { Request, Response } from 'express';
import status from 'http-status';
import handleErrorResponse from '@/utils/controller.helper';

export async function sendOTP(req: Request, res: Response) {
    try {
        res.status(status.OK).json({ message: 'OTP sent' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
