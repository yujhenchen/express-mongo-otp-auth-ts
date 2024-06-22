import { signIn, signOut, signUp } from "controllers/auth.controller";
import { Request, Response, Router, NextFunction } from 'express';

const authRoutes = Router();

// middleware that is specific to this router
const timeLog = (req: Request, res: Response, next: NextFunction) => {
    // console.log('Time: ', Date.now());
    next();
}

authRoutes.use(timeLog);

authRoutes.post('/signup', signUp);

authRoutes.post('/signin', signIn);

authRoutes.post('/signout', signOut);

// authRoutes.get('/userinfo');

export default authRoutes;
