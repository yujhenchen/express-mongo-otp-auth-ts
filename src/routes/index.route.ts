import { Request, Response, NextFunction, Router } from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";

// middleware that is specific to this router
const timeLog = (req: Request, res: Response, next: NextFunction) => {
    // console.log('Time: ', Date.now());
    next();
}

const router = Router();

router.use(timeLog);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.get('/', (req, res) => {
    res.send('Hello World!')
});

export default router;
