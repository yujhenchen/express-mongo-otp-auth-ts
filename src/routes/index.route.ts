import { Request, Response, NextFunction, Router } from "express";
import status from 'http-status';
import authRoutes from "@routes/auth.route";
import userRoutes from "@routes/user.route";

// middleware that is specific to this router
const timeLog = (req: Request, res: Response, next: NextFunction) => {
    // console.log('Time: ', Date.now());
    next();
}

const router = Router();

router.use(timeLog);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('/', (req: Request, res: Response) => {
    res.status(status.OK).json({ message: 'Hello World!' })
});

export default router;
