import status from 'http-status';
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

const validateRequest = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        console.error(error);
        res.status(status.BAD_REQUEST).json({ message: error });
    }
}

export default validateRequest;
