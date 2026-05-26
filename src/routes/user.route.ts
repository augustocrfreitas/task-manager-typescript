import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.findAllUsers);
userRouter.get('/:id', UserController.findById);

userRouter.post('/', UserController.createUser);

userRouter.put('/', UserController.updateUser);

userRouter.delete('/', UserController.deleteUser);

export default userRouter;
