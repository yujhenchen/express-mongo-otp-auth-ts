import IUser from "interfaces/models/user";
import { Document, Model, Schema, model } from "mongoose";

interface IUserDoc extends IUser, Document { };

interface IUserModel extends Model<IUserDoc> { };

const UserSchema = new Schema({
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
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: String,
    //     enum: {
    //         values: ['admin', 'visitor'],
    //         message: '{ROLE} does not exist',
    //     },
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = model<IUserDoc, IUserModel>('users', UserSchema, 'users');

export default User;
