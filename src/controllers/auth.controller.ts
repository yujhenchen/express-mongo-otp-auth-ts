// import { APIRequest, APIResponse } from 'interfaces/express';
import { findOneUser, insertUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


export async function signUp(req: Request, res: Response): Promise<void> {

    const doc = await insertUser(req.body);
    if (!doc) {
        res.status(500).send({ message: 'User registered Failed' });
        return;
    }

    const user = doc.toObject();
    req.body = user;
    res.status(200).send({ message: "User registered successfully!" });
}

export async function signIn(req: Request, res: Response): Promise<void> {
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

        const token = await foundUser.generateToken();
        if (!token) {
            res.status(500).send({ message: 'Failed to generate token' });
            return;
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

export function signOut(req: Request, res: Response): void {

    try {
        /**
         * delete user token
         * refer:
         * https://www.tenxdeveloper.com/blog/jwt-authentication-and-authorization
         * https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2
         */
        res.status(200).send({ message: "You've been signed out!" });
    } catch (error) {
        res.status(500).send({ message: error });
    }
}
