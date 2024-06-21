import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from 'interfaces/models/user';
import User from 'models/user.model';
import create from './user.controller';

export function generateToken(user: IUser): string {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

export async function signup(req, res): Promise<void> {
    try {
        const user = (await create(req.body)).toObject();
        req.user = user;
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
}

export function login(req, res): void {
    try {
        const user = req.user;
        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

export function logout(req, res): void {
    try {
        req.session = null;
        res.status(200).send({ message: "You've been signed out!" });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}
