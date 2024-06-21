import { login, logout, signup } from "controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/signup', signup);

authRoutes.post('/login', login);

authRoutes.post('/logout', logout);

// authRoutes.get('/userinfo');

export default authRoutes;
