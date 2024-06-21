import { Request, Response } from 'express';
import IUser from 'interfaces/models/user';

export interface APIRequest<T = void> extends Request {
    body: T;
};

export interface APIResponse<T = void> extends Response {
    body: T;
};
