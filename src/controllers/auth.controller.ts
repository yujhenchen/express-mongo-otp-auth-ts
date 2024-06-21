import jwt from 'jsonwebtoken';
import config from '../config/config';
import IUser from 'interfaces/models/user';

function generateToken(user: IUser): string {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

export default generateToken;
