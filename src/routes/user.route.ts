import { changeRole, deleteUser, getAllUsers, getUser, updateUser } from "controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/:userId', getUser);

userRoutes.patch('/:userId', updateUser);

userRoutes.get('/all', getAllUsers);

userRoutes.patch('/change-role/:userId', changeRole);

userRoutes.delete('/:userId', deleteUser);

export default userRoutes;
