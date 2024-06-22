import { signin, signout, signup } from "controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/signup', signup);

authRoutes.post('/login', signin);

authRoutes.post('/logout', signout);

// authRoutes.get('/userinfo');

export default authRoutes;
