import pool from '../config/database';
import { CreateTaskInput, Task } from '../models/task.model';

export default class TaskRepository {
    static async getTasks(userId: string): Promise<Task[]> {
        const result = await pool.query(
            /*sql*/
            `
            SELECT 
            t.id,
            t.title,
            t.description,
            t.completed, 
            t."createdAt",
            t."updatedAt",
            tm.name AS "teamName",
            c.name AS "createdByName",
            a.name AS "assigneeName"
            FROM "Task" t
            LEFT JOIN "User" c ON t."createdBy" = c.id
            LEFT JOIN "User" a ON t."assigneeTo" = a.id
            LEFT JOIN "Team" tm ON t."teamId" = tm.id
            WHERE t."createdBy" = $1    
            `,
            [userId],
        );
        return result.rows;
    }

    static async getTaskById(id: string): Promise<Task> {
        const result = await pool.query(
            /*sql*/
            `
            SELECT 
            t.id,
            t.title,
            t.description,
            t.completed, 
            t."createdAt",
            t."updatedAt",
            tm.name AS "teamName",
            c.name AS "createdByName",
            a.name AS "assigneeName"
            FROM "Task" t
            LEFT JOIN "User" c ON t."createdBy" = c.id
            LEFT JOIN "User" a ON t."assigneeTo" = a.id
            LEFT JOIN "Team" tm ON t."teamId" = tm.id 
            WHERE t.id = $1  
            `,
            [id],
        );
        return result.rows[0];
    }

    static async createTask(data: CreateTaskInput): Promise<Task> {
        console.log(data);
        const result = await pool.query(
            /*sql*/
            `
           WITH inserted_task AS (
                INSERT INTO "Task" (title, description, "teamId", "assigneeTo", "createdBy")
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            )
            SELECT 
                t.id,
                t.title,
                t.description,
                t.completed, 
                t."createdAt",
                t."updatedAt",
                tm.name AS "teamName",
                c.name AS "createdByName",
                a.name AS "assigneeName"
                FROM inserted_task t
                LEFT JOIN "User" c ON t."createdBy" = c.id
                LEFT JOIN "User" a ON t."assigneeTo" = a.id
                LEFT JOIN "Team" tm ON t."teamId" = tm.id
            `,
            [data.title, data.description, data.teamId, data.assigneeTo, data.createdBy],
        );
        return result.rows[0];
    }
}
