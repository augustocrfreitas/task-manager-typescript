import TaskController from '../controllers/task.controller';
import { Router } from 'express';

export const taskRouter = Router();

taskRouter.get('/user/:userId', TaskController.getTasks);
taskRouter.get('/:id', TaskController.getTaskById);

taskRouter.post('/', TaskController.createTask);
