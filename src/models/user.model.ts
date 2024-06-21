import IUser from "interfaces/models/user";
import { Model, Schema, model } from "mongoose";

const UserSchema: Schema = new Schema<IUser, Model<IUser>>({
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
    role: {
        type: String,
        enum: {
            values: ['admin', 'visitor'],
            message: '{ROLE} does not exist',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = model<IUser>('User', UserSchema);

export default User;
