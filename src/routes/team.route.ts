import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { TeamController } from '../controllers/team.controller';

export const teamRouter = Router();

teamRouter.get('/', authMiddleware, TeamController.getAllTeams);
teamRouter.get('/:id', authMiddleware, TeamController.getTeamById);

teamRouter.post('/', authMiddleware, TeamController.createTeam);
