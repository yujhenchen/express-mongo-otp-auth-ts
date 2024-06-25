import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from 'models/user.model';
import { IUser } from 'interfaces/models/user';

const saltOrRounds = 10;

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

export async function createUser(user: IUser) {
    try {
        user = await userSchema.validateAsync(user, { abortEarly: false });
        user.password = bcrypt.hashSync(user.password, saltOrRounds);
        return await new User(user).save();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        // get a user
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        // update user
    } catch (error) {
        console.error(error);
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        // get all users
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function changeRole(req: Request, res: Response) {
    try {
        // change user role
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        // delete user
    } catch (error) {
        console.error(error);
    }
}
