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

async function create(user: IUser) {
    user = await userSchema.validateAsync(user, { abortEarly: false });
    user.password = bcrypt.hashSync(user.password, saltOrRounds);
    return await new User(user).save();
}

export default create;
