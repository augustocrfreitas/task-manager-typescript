import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const userRouter = Router();

userRouter.get('/', authMiddleware, UserController.findAllUsers);
userRouter.get('/:id', authMiddleware, UserController.findUserById);

userRouter.post('/create', UserController.createUser);

userRouter.post('/login', UserController.login);
