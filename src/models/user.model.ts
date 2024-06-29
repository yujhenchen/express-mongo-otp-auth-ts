import { UserRole } from "constants/userRoles";
import { IUserDoc, IUserMethods, IUserModel } from "interfaces/user";
import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import config from "config/config";

const uerSchema = new Schema<IUserDoc, IUserModel, IUserMethods>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: Object.values(UserRole),
            message: '{ROLE} does not exist',
        },
        default: UserRole.visitor
    },
    token: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

uerSchema.methods.generateToken = async function (): Promise<string> {
    try {
        /**
         * the data type of this is: 
         * Document<unknown, {}, FlatRecord<IUserDoc>> & Omit<FlatRecord<IUserDoc> & Required<{ _id: unknown; }>, keyof IUserMethods> & IUserMethods
         */
        const token = jwt.sign({ name: this.name }, config.jwtSecret, { expiresIn: 86400 });
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.error(error);
        return '';
    }
}

uerSchema.methods.deleteToken = async function (): Promise<void> {
    try {
        this.token = '';
        await this.save();
    } catch (error) {
        console.error(error);
    }
}

const User = model<IUserDoc, IUserModel>('users', uerSchema, 'users');

export default User;
