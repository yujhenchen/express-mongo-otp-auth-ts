import jwt from 'jsonwebtoken';
import config from "config/config";

export default function generateJWTToken(payload: object, expiresIn = 86400): string {
    try {
        // const payload = { name: userName };
        return jwt.sign(payload, config.jwtSecret, {
            algorithm: 'HS256',
            expiresIn
        });
    } catch (error) {
        console.error(error);
        return '';
    }
}
