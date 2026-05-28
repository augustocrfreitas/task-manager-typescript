import pool from '../config/database.js';
import { CreateUserInput, User } from '../models/user.model.js';

export class UserRepository {
    static async findAllUsers() {
        const result = await pool.query(
            /*sql*/
            `
      SELECT * FROM "User"
      `,
        );
        return result.rows;
    }

    static async getUserById(id: string): Promise<User> {
        const result = await pool.query(
            /*sql*/
            `
      SELECT * FROM "User" WHERE id = $1
      `,
            [id],
        );
        return result.rows[0];
    }

    static async getUserByEmail(email: string): Promise<User> {
        const result = await pool.query(
            /*sql*/
            `
      SELECT * FROM "User" WHERE email = $1
      `,
            [email],
        );
        return result.rows[0];
    }

    static async createUser(user: CreateUserInput): Promise<User> {
        console.log(user.name);
        const result = await pool.query(
            /*sql*/
            `
      INSERT INTO "User" (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
            [user.name, user.email, user.password],
        );
        console.log(result.rows[0]);
        return result.rows[0];
    }
}
