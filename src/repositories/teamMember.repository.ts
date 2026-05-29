import pool from '../config/database';
import { CreateTeamMemberInput, TeamMember } from '../models/teamMember.model';

export default class TeamMemberRepository {
    static async getTeamMembers(): Promise<TeamMember[]> {
        const result = await pool.query(
            /*sql*/
            `
            SELECT * FROM "TeamMember"
            `,
        );
        return result.rows;
    }

    static async getTeamMemberById(id: string): Promise<TeamMember> {
        const result = await pool.query(
            /*sql*/
            `
            SELECT * FROM "TeamMember" WHERE id = $1;
            `,
            [id],
        );
        return result.rows[0];
    }

    static async createTeamMember(data: CreateTeamMemberInput): Promise<TeamMember> {
        const result = await pool.query(
            /*sql*/
            `
            INSERT INTO "TeamMember" ("userId", "teamId")
            VALUES ($1, $2)
            RETURNING *;
            `,
            [data.userId, data.teamId],
        );
        return result.rows[0];
    }
}
