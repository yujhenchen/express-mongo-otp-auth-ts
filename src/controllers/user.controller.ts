import Joi from 'joi';
import bcrypt from 'bcrypt';
import User from 'models/user.model';
import IUser from 'interfaces/models/user';

const saltOrRounds = 10;

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

export async function insertUser(user: IUser) {
    try {
        user = await userSchema.validateAsync(user, { abortEarly: false });
        user.password = bcrypt.hashSync(user.password, saltOrRounds);
        return await new User(user).save();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findOneUser(userName: string) {
    try {
        const user = await User.findOne({ name: userName }).exec();

        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}
