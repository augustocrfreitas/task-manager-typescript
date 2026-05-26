import pool from '../config/database.js';
import {
  User,
  CreateUserInput,
  UpdatedUserInput,
  PublicUser,
} from '../models/user.model.js';

class UserRepository {
  static async findAllUsers(): Promise<User[]> {
    const result = await pool.query(/*sql*/ `SELECT * FROM "User"`);
    console.log(result.rows);
    return result.rows;
  }

  static async findUserById(id: string): Promise<User> {
    const result = await pool.query(
      /*sql*/ `
        SELECT * FROM "User" WHERE id = $1
        `,
      [id],
    );
    return result.rows[0];
  }

  static async findUserByEmail(email: string): Promise<User> {
    const result = await pool.query(
      `
        SELECT * FROM "User" WHERE email = $1
        `,
      [email],
    );
    return result.rows[0];
  }

  static async createUser(dados: CreateUserInput): Promise<User> {
    const result = await pool.query(
      `
        INSERT INTO "User" (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
      [dados.name, dados.email, dados.password],
    );
    return result.rows[0];
  }

  static async deleteUser(id: string): Promise<User> {
    const result = await pool.query(
      `
        DELETE FROM "User" WHERE id = $1
        RETURNING *
        `,
      [id],
    );
    return result.rows[0];
  }

  static async updateUser(
    id: string,
    dados: UpdatedUserInput,
  ): Promise<PublicUser> {
    const result = await pool.query(
      `
        UPDATE "User"
        SET name = $1, email = $2, password = $3, "updatedAt" = NOW()
        WHERE id = $4
        RETURNING *
        `,
      [dados.name, dados.email, dados.password, id],
    );
    return result.rows[0];
  }
}

export default UserRepository;
