import { signIn, signOut, signUp } from "controllers/auth.controller";
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/signup', signUp);

authRoutes.post('/signin', signIn);

authRoutes.post('/signout', signOut);

export default authRoutes;
