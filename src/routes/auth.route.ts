import { signIn, signOut, signUp } from "@controllers/auth.controller";
import { Router } from 'express';
import validateRequest from "@middleware/validate.middleware ";
import { signOutSchema, signInSchema, signUpSchema } from "@middleware/validators";

const authRoutes = Router();

authRoutes.post('/signup', validateRequest(signUpSchema), signUp);

authRoutes.post('/signin', validateRequest(signInSchema), signIn);

authRoutes.post('/signout', validateRequest(signOutSchema), signOut);

export default authRoutes;
