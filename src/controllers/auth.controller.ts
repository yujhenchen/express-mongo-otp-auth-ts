// import { APIRequest, APIResponse } from 'interfaces/express';
import { findOneUser, insertUser } from './user.controller';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


export async function signUp(req: Request, res: Response): Promise<void> {
    try {
        const { name } = req.body;
        const user = await findOneUser(name);
        if (user) {
            res.status(409).send({ message: `User already exists: ${name}` });
            return;
        }

        const newUser = await insertUser(req.body);
        if (!newUser) {
            res.status(500).send({ message: 'User registered Failed' });
            return;
        }

        req.body = newUser.toJSON();
        res.status(200).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error });
    }

}

export async function signIn(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;
        const user = await findOneUser(name);
        if (!user) {
            res.status(404).send({ message: `User Not found. User name: ${name}` });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({
                message: "Invalid Password!",
            });
            return;
        }

        const token = await user.generateToken();
        if (!token) {
            res.status(500).send({ message: 'Failed to generate token' });
            return;
        }

        res.status(200).send({
            name: user.name,
            email: user.email,
            // role: user.role,
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
