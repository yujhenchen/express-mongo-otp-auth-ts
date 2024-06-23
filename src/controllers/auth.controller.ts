// import { APIRequest, APIResponse } from 'interfaces/express';
import { findOneUser, insertUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import status from 'http-status';

export async function signUp(req: Request, res: Response): Promise<void> {
    try {
        const { name } = req.body;
        const user = await findOneUser(name);
        if (user) {
            res.status(status.CONFLICT).send({ message: `User already exists: ${name}` });
            return;
        }

        const newUser = await insertUser(req.body);
        if (!newUser) {
            res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'User registered Failed' });
            return;
        }

        req.body = newUser.toJSON();
        res.status(status.OK).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ message: error });
    }

}

export async function signIn(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const user = await findOneUser(name);
        if (!user) {
            res.status(status.NOT_FOUND).send({ message: `User Not found. User name: ${name}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(status.UNAUTHORIZED).send({
                message: "Invalid Password!",
            });
            return;
        }

        const token = await user.generateToken();
        if (!token) {
            res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Failed to generate token' });
            return;
        }

        res.status(status.OK).send({
            name: user.name,
            email: user.email,
            // role: user.role,
            token
        });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ message: error });
    }
}

export async function signOut(req: Request, res: Response): Promise<void> {

    try {
        const { name, password } = req.body;
        const user = await findOneUser(name);
        if (!user) {
            res.status(status.NOT_FOUND).send({ message: `User Not found. User name: ${name}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(status.UNAUTHORIZED).send({
                message: "Invalid Password!",
            });
            return;
        }

        await user.deleteToken();

        res.status(status.OK).send({ message: "You've been signed out!" });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ message: error });
    }
}
