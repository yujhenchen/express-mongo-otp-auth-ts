import Joi from 'joi';
import bcrypt from 'bcrypt';
import User from 'models/user.model';
import IUser from 'interfaces/models/user';
import { Document, Types } from 'mongoose';

const saltOrRounds = 10;

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

export async function insertUser(user: IUser): Promise<(Document<unknown, {}, IUser> & IUser & {
    _id: Types.ObjectId;
}) | null> {
    try {
        // verify fields
        user = await userSchema.validateAsync(user, { abortEarly: false });

        // hash password
        user.password = bcrypt.hashSync(user.password, saltOrRounds);

        // insert a new document
        return await new User(user).save();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// export async function findOneUser(user: IUser) {
//     try {
//         const foundUser = await User.findOne({
//             where: {
//                 name: user.name,
//             }
//         });

//         // user not found
//         if (!foundUser) {
//             console.error(`findOneUser: user ${user.name} not found`);
//             return null;
//         }

//         // verify password

//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }
