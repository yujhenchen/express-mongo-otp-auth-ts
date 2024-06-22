import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from 'interfaces/models/user';
// import { APIRequest, APIResponse } from 'interfaces/express';
import { findOneUser, insertUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export function generateToken(userName: string): string {
    try {
        const payload = { name: userName };
        return jwt.sign(payload, config.jwtSecret, {
            algorithm: 'HS256',
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (error) {
        console.error(error);
        return '';
    }
}

export async function signup(req: Request, res: Response): Promise<void> {

    const doc = await insertUser(req.body);
    if (!doc) {
        res.status(500).send({ message: 'User registered Failed' });
        return;
    }

    const user = doc.toObject();
    req.body = user;
    res.status(200).send({ message: "User registered successfully!" });
}

export async function signin(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const foundUser = await findOneUser(name);
        if (!foundUser) {
            res.status(404).send({ message: `User Not found. User name: ${name}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
        if (!isPasswordValid) {
            res.status(401).send({
                message: "Invalid Password!",
            });
            return;
        }

        const token = generateToken(name);
        if (!token) {
            res.status(500).send({ message: 'Failed to generate token' });
        }

        res.status(200).send({
            name: foundUser.name,
            email: foundUser.email,
            // role: foundUser.role,
            token
        });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

// export function signout(req: Request, res: Response): void {

//     try {
//         req.session.destroy(function (err) {
//             // cannot access session here
//             console.error(err);
//         });
//         res.status(200).send({ message: "You've been signed out!" });
//     } catch (error) {
//         res.status(500).send({ message: error });
//     }
// }
