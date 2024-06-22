import { signin, signup } from "controllers/auth.controller";
import { Request, Response, Router, NextFunction } from 'express';

const authRoutes = Router();

// middleware that is specific to this router
const timeLog = (req: Request, res: Response, next: NextFunction) => {
    // console.log('Time: ', Date.now());
    next();
}

authRoutes.use(timeLog);

authRoutes.post('/signup', signup);

authRoutes.post('/signin', signin);

// authRoutes.post('/signout', signout);

// authRoutes.get('/userinfo');

export default authRoutes;
