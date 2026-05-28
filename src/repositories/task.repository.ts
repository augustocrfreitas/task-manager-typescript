import pool from '../config/database';
import { CreateTaskInput, Task } from '../models/task.model';

export default class TaskRepository {
    static async getTasks(userId: string): Promise<Task[]> {
        const result = await pool.query(
            `
            SELECT * FROM "Task" WHERE "createdBy" = $1
            `,
            [userId],
        );
        return result.rows;
    }

    static async getTaskById(id: string): Promise<Task> {
        const result = await pool.query(
            `
            SELECT * FROM "Task" WHERE id = $1  
            `,
            [id],
        );
        return result.rows[0];
    }

    static async createTask(data: CreateTaskInput): Promise<Task> {
        const result = await pool.query(
            `
            INSERT INTO "Task" (title, description, teamId, assigneeTo, createdBy)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [data.title, data.description, data.teamId, data.assigneeTo, data.createdBy],
        );
        return result.rows[0];
    }
}
