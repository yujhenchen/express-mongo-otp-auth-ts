import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from 'interfaces/models/user';
import User from 'models/user.model';
import create from './user.controller';
import { APIRequest, APIResponse } from 'interfaces/express';

export function generateToken(user: IUser): string {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

export async function signup(req: APIRequest<IUser>, res: APIResponse<IUser>): Promise<void> {
    try {
        const user = (await create(req.body)).toObject();
        req.body = user;
        res.status(200).send({ message: "User registered successfully!" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
}

export function login(req: APIRequest<IUser>, res: APIResponse<IUser>): void {
    try {
        const user = req.body;
        const token = generateToken(user);
        res.json({ user, token });
        res.status(200).send({
            // id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

export function logout(req: APIRequest<IUser>, res: APIResponse<IUser>): void {
    try {
        req.session.destroy(function (err) {
            // cannot access session here
            console.error(err)
        });
        res.status(200).send({ message: "You've been signed out!" });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}
