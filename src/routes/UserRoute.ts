import express from 'express';
import { UserController } from '../controllers';
import { UserValidation } from '../middleware/validation';
import { Authorization } from '../middleware';

const userRoutes = express.Router();
const UserValidator = new UserValidation();
const userController = new UserController();

userRoutes.post('/signup', UserValidator.signUp, userController.signUp);
userRoutes.post('/signin', UserValidator.signIn, userController.signIn);
userRoutes.get('/refresh-token', userController.refreshToken);
userRoutes.get('/signout', Authorization, userController.signOut);
userRoutes.get('/current-user', Authorization, userController.userDetail);

export default userRoutes;