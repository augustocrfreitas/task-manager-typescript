import { CreateTaskInput, Task } from '../models/task.model';
import TaskRepository from '../repositories/task.repository';

export default class TaskService {
    static async getTasks(userId: string): Promise<Task[]> {
        const result = await TaskRepository.getTasks(userId);

        if (result.length === 0) {
            throw new Error('Nenhuma tarefa cadastrada.');
        }

        return result;
    }

    static async getTaskById(id: string): Promise<Task> {
        const result = await TaskRepository.getTaskById(id);

        if (!result) {
            throw new Error('Tarefa não existe');
        }

        return result;
    }

    static async createTask(data: CreateTaskInput): Promise<Task> {
        const result = await TaskRepository.createTask(data);

        return result;
    }
}
