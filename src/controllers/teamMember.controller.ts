import { Request, Response } from 'express';
import TeamMemberService from '../services/teamMember.service';

export default class TeamMemberController {
    static async getTeamMembers(req: Request, res: Response): Promise<void> {
        try {
            const result = await TeamMemberService.getTeamMembers();
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }

    static async getTeamMemberById(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        try {
            const result = await TeamMemberService.getTeamMemberById(id);
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }

    static async createTeamMember(req: Request, res: Response): Promise<void> {
        const data = req.body;
        try {
            const result = await TeamMemberService.createTeamMember(data);
            res.status(201).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }
}
