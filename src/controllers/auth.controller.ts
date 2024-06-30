import { createUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import status from 'http-status';
import User from 'models/user.model';
import handleErrorResponse from 'utils/controller.helper';
import { IUserSignIn, IUserSignOut, IUserSignUp } from 'interfaces/user';

export async function signUp(
    req: Request<Record<string, never>, Record<string, never>, IUserSignUp, Record<string, never>>,
    res: Response): Promise<void> {
    try {
        const { name } = req.body;

        const user = await User.findOne({ name }).exec();
        if (user) {
            res.status(status.CONFLICT).json({ message: `User already exists: ${name}` });
            return;
        }

        const newUser = await createUser(req.body);
        if (!newUser) {
            res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'User registered Failed' });
            return;
        }

        res.status(status.OK).json(newUser.toJSON());
    } catch (error) {
        handleErrorResponse(error, res);
    }

}

export async function signIn(
    req: Request<Record<string, never>, Record<string, never>, IUserSignIn, Record<string, never>>,
    res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(status.NOT_FOUND).json({ message: `User Not found. User email: ${email}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(status.UNAUTHORIZED).json({
                message: "Invalid Password!",
            });
            return;
        }

        const token = await user.generateToken();
        if (!token) {
            res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Failed to generate token' });
            return;
        }

        res.status(status.OK).json(user.toJSON());
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function signOut(
    req: Request<Record<string, never>, Record<string, never>, IUserSignOut, Record<string, never>>,
    res: Response): Promise<void> {

    try {
        const { name } = req.body;
        const user = await User.findOne({ name }).exec();
        if (!user) {
            res.status(status.NOT_FOUND).json({ message: `User Not found. User name: ${name}` });
            return;
        }

        await user.deleteToken();

        res.status(status.OK).json({ message: "You've been signed out!" });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
