import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from 'interfaces/models/user';
// import { APIRequest, APIResponse } from 'interfaces/express';
import { insertUser } from './user.controller';
import { Request, Response } from 'express';

export function generateToken(user: IUser): string {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
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

// export function signin(req: Request, res: Response): void {
//     try {
//         const user = req.body;
//         const token = generateToken(user);
//         res.json({ user, token });
//         res.status(200).send({
//             // id: user.id,
//             name: user.name,
//             email: user.email,
//             // role: user.role,
//             createdAt: user.createdAt
//         });
//     } catch (error) {
//         res.status(500).send({ message: error });
//     }
// }

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
