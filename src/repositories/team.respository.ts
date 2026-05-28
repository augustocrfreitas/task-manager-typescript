import pool from '../config/database.js';
import { CreateTeamInput, Team } from '../models/team.model.js';

export class TeamRepository {
    static async getAllTeams(): Promise<Team[]> {
        const result = await pool.query(
            /*sql*/
            `
        SELECT * FROM "Team"   
        `,
        );
        console.log(result.rows);
        return result.rows;
    }

    static async getTeamById(id: string): Promise<Team> {
        const result = await pool.query(
            `
        SELECT * FROM "Team" WHERE id = $1  
        `,
            [id],
        );
        return result.rows[0];
    }

    static async createTeam(teamName: CreateTeamInput): Promise<Team> {
        const result = await pool.query(
            /*sql*/
            `
        INSERT INTO "Team" (name) 
        VALUES ($1)
        RETURNING *
        `,
            [teamName],
        );
        return result.rows[0];
    }
}
