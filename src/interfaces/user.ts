import { TUserRole } from "@constants/userRoles";
import { Document, Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    token: string;
    createdAt: Date;
}

export interface IUserDoc extends IUser, Document { };

export interface IUserMethods {
    generateToken(): Promise<string>;
    deleteToken(): Promise<void>;
    toJSON(): Omit<IUser, 'password'> | null;
}

export interface IUserSignUp extends Omit<IUser, "token" | "createdAt"> { };

export interface IUserSignIn extends Omit<IUser, "name" | "role" | "token" | "createdAt"> { };

export interface IUserSignOut extends Pick<IUser, "name" | "token"> { };

export interface IUserUpdate extends Omit<IUser, "role" | "token" | "createdAt"> { };

export interface IUserModel extends Model<IUserDoc, Record<string, never>, IUserMethods> { };
