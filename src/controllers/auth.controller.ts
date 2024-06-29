import { createUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import status from 'http-status';
import User from 'models/user.model';
import handleErrorResponse from 'utils/controller.helper';

export async function signUp(req: Request, res: Response): Promise<void> {
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

        req.body = newUser.toJSON();
        res.status(status.OK).json({ message: "User registered successfully!" });
    } catch (error) {
        handleErrorResponse(error, res);
    }

}

export async function signIn(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name }).exec();
        if (!user) {
            res.status(status.NOT_FOUND).json({ message: `User Not found. User name: ${name}` });
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

        res.status(status.OK).json({
            name: user.name,
            email: user.email,
            // role: user.role,
            token
        });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function signOut(req: Request, res: Response): Promise<void> {

    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name }).exec();
        if (!user) {
            res.status(status.NOT_FOUND).json({ message: `User Not found. User name: ${name}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(status.UNAUTHORIZED).json({
                message: "Invalid Password!",
            });
            return;
        }

        await user.deleteToken();

        res.status(status.OK).json({ message: "You've been signed out!" });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
