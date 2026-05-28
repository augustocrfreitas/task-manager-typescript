import TaskController from '../controllers/task.controller';
import { Router } from 'express';

export const taskRouter = Router();

taskRouter.get('/:id', TaskController.getTasks);
taskRouter.get('/id/:id', TaskController.getTaskById);

taskRouter.post('/', TaskController.createTask);
