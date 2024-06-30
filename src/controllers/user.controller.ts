import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import status from 'http-status';
import User from 'models/user.model';
import { IUser, IUserSignUp, IUserUpdate } from 'interfaces/user';
import handleErrorResponse from 'utils/controller.helper';

const saltOrRounds = 10;

export async function createUser(user: IUserSignUp) {
    try {
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

        if (user) res.status(status.OK).json({ data: user.toJSON() });
        else res.status(status.NOT_FOUND).json({ message: 'Cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function updateUser(
    req: Request<{ userId: string }, Record<string, never>, IUserUpdate, Record<string, never>>,
    res: Response) {
    try {
        const {
            params: { userId },
        } = req;

        const payload = req.body;

        if (!payload || !Object.keys(payload).length) {
            res.status(status.BAD_REQUEST).json({ message: 'Request cannot be empty' });
            return;
        }

        const user = await User.findByIdAndUpdate(userId, payload);

        // TODO: implement toJSON method to get only necessary user data from the user doc
        if (user) res.status(status.OK).json({ message: 'Successfully updated the user' });
        else res.status(status.NOT_FOUND).json({ message: 'Failed to update the user, cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.find({});
        res.status(status.OK).json({ data: users });
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
        if (user) res.status(status.OK).json({ message: 'Successfully updated the user' });
        else res.status(status.NOT_FOUND).json({ message: 'Failed to update the user, cannot find the user' });
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
        if (user) res.status(status.OK).json({ message: 'Successfully deleted the user' });
        else res.status(status.NOT_FOUND).json({ message: 'Failed to delete the user, cannot find the user' });
    } catch (error) {
        handleErrorResponse(error, res);
    }
}
