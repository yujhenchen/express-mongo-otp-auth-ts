import { changeRole, deleteUser, getAllUsers, getUser, updateUser } from "controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

/**
 * To prevent the route '/all' from being interpreted as a userId parameter,
 *  causing Mongoose to attempt to cast the string "all" to an ObjectId:
 *  keep the oder of the routes '/all' before '/:userId'
 */
userRoutes.get('/all', getAllUsers);

userRoutes.get('/:userId', getUser);

userRoutes.patch('/:userId', updateUser);

userRoutes.patch('/change-role/:userId', changeRole);

userRoutes.delete('/:userId', deleteUser);

export default userRoutes;
