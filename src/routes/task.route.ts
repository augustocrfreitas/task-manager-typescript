import TaskController from '../controllers/task.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';

export const taskRouter = Router();

taskRouter.get('/user/:userId', authMiddleware, TaskController.getTasks);
taskRouter.get('/:id', authMiddleware, TaskController.getTaskById);

taskRouter.post('/', authMiddleware, TaskController.createTask);
