import { Request, Response } from 'express';
import { TeamService } from '../services/team.service.js';

export class TeamController {
    static async getAllTeams(req: Request, res: Response): Promise<void> {
        try {
            const result = await TeamService.getTeams();
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ erro: err.message });
        }
    }

    static async getTeamById(req: Request, res: Response): Promise<void> {
        const { id } = req.params as { id: string };
        try {
            const result = await TeamService.getTeamById(id);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(404).json({ erro: err.message });
        }
    }

    static async createTeam(req: Request, res: Response): Promise<void> {
        if (!req.body) {
            res.status(400).json({
                erro: 'Insira o nome do time para prosseguir',
            });
        }
        const { teamName } = req.body;
        try {
            const result = await TeamService.createTeam(teamName);
            res.status(201).json({
                message: 'Time criado com sucesso!!',
                team: result,
            });
        } catch (error) {
            const err = error as Error;
            res.status(404).json({ erro: err.message });
        }
    }
}
