import { Request, Response } from 'express';

export interface APIRequest<T = void> extends Request {
    body: T;
};

export interface APIResponse<T = void> extends Response {
    body: T;
};
