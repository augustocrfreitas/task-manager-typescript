import { Request, Response } from 'express';
import TaskService from '../services/task.service';

export default class TaskController {
    static async getTasks(req: Request, res: Response): Promise<void> {
        const { userId } = req.params as { userId: string };
        try {
            const result = await TaskService.getTasks(userId);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }

    static async getTaskById(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        try {
            const result = await TaskService.getTaskById(id);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }

    static async createTask(req: Request, res: Response): Promise<void> {
        const task = req.body;
        try {
            const result = await TaskService.createTask(task);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }
}
