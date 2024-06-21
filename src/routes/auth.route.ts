import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/signup');

authRoutes.post('/login');

authRoutes.post('/logout');

authRoutes.get('/userinfo');

export default authRoutes;
