import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
export const userRouter = Router();

userRouter.get('/', UserController.findAllUsers);
userRouter.get('/:id', UserController.findUserById);

userRouter.post('/create', UserController.createUser);

userRouter.post('/login', UserController.login);
