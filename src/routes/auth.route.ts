import { signIn, signOut, signUp } from "controllers/auth.controller";
import { Router } from 'express';
import validateRequest from "middleware/validate.middleware ";
import { signinSchema, signupSchema } from "middleware/validators";

const authRoutes = Router();

authRoutes.post('/signup', validateRequest(signupSchema), signUp);

authRoutes.post('/signin', validateRequest(signinSchema), signIn);

authRoutes.post('/signout', signOut);

export default authRoutes;
