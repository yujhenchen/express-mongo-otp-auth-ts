import status from 'http-status';
import { Request, Response, NextFunction } from "express";
import { Schema, ValidationError } from "joi";

const validateRequest = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        console.error(error);

        if (error instanceof ValidationError) res.status(status.BAD_REQUEST).json({ message: error.details.map(detail => detail.message) });
        else if (error instanceof Error) res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
        else res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Unknown error occurred' });
    }
}

export default validateRequest;
