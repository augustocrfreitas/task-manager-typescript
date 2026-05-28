import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, userSchema } from '../schemas/user.schema.js';

export const userRouter = Router();

userRouter.get('/', authMiddleware, UserController.findAllUsers);
userRouter.get('/:id', authMiddleware, UserController.findUserById);

userRouter.post('/create', validate(userSchema), UserController.createUser);
userRouter.post('/login', validate(loginSchema), UserController.login);
