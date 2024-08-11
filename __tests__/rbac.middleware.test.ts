import validateToken from '../src/middleware/rbac.middleware';
import User from '../src/models/user.model';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../src/constants/userRoles';

jest.mock('../src/models/user.model');  

describe('validateToken Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 401 if no authorization header is present', async () => {
        req.headers = {};

        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'No authorization header found' });
    });

    it('should return 401 if authorization header format is incorrect', async () => {
        req.headers = {
            authorization: 'InvalidToken',
        };

        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid authorization header format. Expected format: Bearer <token>' });
    });

    it('should return 404 if user is not found', async () => {
        req.headers = {
            authorization: 'Bearer validToken',
        };
        (User.findOne as jest.Mock).mockResolvedValueOnce(null);

        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find the user' });
    });

    it('should return 403 if user role is not admin', async () => {
        req.headers = {
            authorization: 'Bearer validToken',
        };
        const mockUser = {
            role: UserRole.visitor,
        };
        (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });

    it('should call next if token is valid and user is admin', async () => {
        req.headers = {
            authorization: 'Bearer validToken',
        };
        const mockUser = {
            role: UserRole.ADMIN,
        };
        (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

        await validateToken(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
        req.headers = {
            authorization: 'Bearer validToken',
        };
        (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

        await validateToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
});
