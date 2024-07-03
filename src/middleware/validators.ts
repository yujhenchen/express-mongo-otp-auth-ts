import { UserRole } from "@constants/userRoles";
import Joi, { EmailOptions } from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;<>,.?/~\\|-]).{8,16}$/;
const emailOptions: EmailOptions = Object.freeze({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

export const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(emailOptions).required(),
    // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
    repeatPassword: Joi.ref('password')
});

export const signinSchema = Joi.object({
    email: Joi.string().email(emailOptions).required(),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required()
});

export const signOutSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    token: Joi.string().required()
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(emailOptions),
    password: Joi.string().pattern(new RegExp(passwordRegex)),
    // role: Joi.string().valid(...Object.values(UserRole)),
    // token: Joi.string(),
});

export const changeRoleSchema = Joi.object({
    role: Joi.string().valid(...Object.values(UserRole)).required()
}).unknown(false);
