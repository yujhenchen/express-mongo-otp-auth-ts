import Joi from 'joi';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import status from 'http-status';
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

function handleErrorResponse(error: unknown, res: Response): void {
    console.error(error);

    if (error instanceof Error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Internal Server Error' });
    }
    else {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Unknown error occurred' });
    }
}

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

export async function getUser(req: Request<{ userId: string }>, res: Response) {
    try {
        const {
            userId
        } = req.params;

        const user = await User.findById(userId).exec();

        if (user) res.status(status.OK).json({ status: true, data: user.toJSON() });
        else res.status(status.NOT_FOUND).json({ status: false, message: 'Cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function updateUser(
    req: Request<{ userId: string }, Record<string, never>, { payload: Omit<IUser, "token" | "createdAt"> }, Record<string, never>>,
    res: Response) {
    try {
        const {
            params: { userId },
        } = req;

        const payload = req.body;

        if (!payload || !Object.keys(payload).length) {
            res.status(status.BAD_REQUEST).json({ status: false, message: 'Request cannot be empty' });
            return;
        }

        const user = await User.findByIdAndUpdate(userId, payload);

        // TODO: implement toJSON method to get only necessary user data from the user doc
        if (user) res.status(status.OK).json({ status: true, message: 'Successfully updated the user' });
        else res.status(status.NOT_FOUND).json({ status: true, message: 'Failed to update the user, cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.find({});
        res.status(status.OK).json({ status: true, data: users });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function changeRole(req: Request<{ userId: string }, Record<string, never>, Pick<IUser, 'role'>, Record<string, never>>, res: Response) {
    try {
        const {
            params: { userId },
        } = req;

        const { role } = req.body;

        const user = await User.findByIdAndUpdate(userId, { role });

        // TODO: implement toJSON method to get only necessary user data from the user doc
        if (user) res.status(status.OK).json({ status: true, message: 'Successfully updated the user' });
        else res.status(status.NOT_FOUND).json({ status: true, message: 'Failed to update the user, cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function deleteUser(req: Request<{ userId: string }>, res: Response) {
    try {
        const {
            params: { userId },
        } = req;

        const user = await User.findByIdAndDelete(userId);

        // TODO: implement toJSON method to get only necessary user data from the user doc
        if (user) res.status(status.OK).json({ status: true, message: 'Successfully deleted the user' });
        else res.status(status.NOT_FOUND).json({ status: true, message: 'Failed to delete the user, cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
