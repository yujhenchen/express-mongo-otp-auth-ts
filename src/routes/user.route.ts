import { changeRole, deleteUser, getAllUsers, getUser, updateUser } from "@controllers/user.controller";
import { Router } from "express";
import validateToken from "@middleware/rbac.middleware";
import validateRequest from "@middleware/validate.middleware ";
import { changeRoleSchema, updateUserSchema } from "@middleware/validators";

const userRoutes = Router();

/**
 * To prevent the route '/all' from being interpreted as a userId parameter,
 *  causing Mongoose to attempt to cast the string "all" to an ObjectId:
 *  keep the oder of the routes '/all' before '/:userId'
 */
userRoutes.get('/all', getAllUsers);

userRoutes.get('/:userId', getUser);

userRoutes.patch('/:userId', validateRequest(updateUserSchema), updateUser);

userRoutes.patch('/change-role/:userId', validateRequest(changeRoleSchema), validateToken, changeRole);

userRoutes.delete('/:userId', validateToken, deleteUser);

export default userRoutes;
