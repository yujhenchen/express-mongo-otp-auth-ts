import jwt from 'jsonwebtoken';
import config from "config/config";

export default function generateJWTToken(payload: object, expiresIn = 86400): string {
    try {
        return jwt.sign(payload, config.jwtSecret, { expiresIn });
    } catch (error) {
        console.error(error);
        return '';
    }
}
