import status from 'http-status';
import { Request, Response, NextFunction } from "express";
import User from 'models/user.model';
import { UserRole } from 'constants/userRoles';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = req.headers;
        if (!headers) return res.status(status.BAD_REQUEST).json({ message: 'No headers found' });

        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(status.UNAUTHORIZED).json({ message: 'No authorization header found' });

        const tokenParts = authHeader.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer')
            return res.status(status.UNAUTHORIZED).json({ message: 'Invalid authorization header format. Expected format: Bearer <token>' });

        const token = tokenParts[1];
        if (!token) return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });

        const user = await User.findOne({ token });
        if (!user) return res.status(status.NOT_FOUND).json({ message: 'Cannot find the user' });

        if (user.role !== UserRole.ADMIN) return res.status(status.FORBIDDEN).json({ message: 'Access denied' });

        next();
    } catch (error) {
        console.error(error);

        if (error instanceof Error) return res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
        else return res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Unknown error occurred' });
    }
}

export default validateToken;
