import TeamMemberController from '../controllers/teamMember.controller';
import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { teamMemberSchema } from '../schemas/teamMember.schema';

export const teamMemberRouter = Router();

teamMemberRouter.get('/', TeamMemberController.getTeamMembers);
teamMemberRouter.get('/:id', TeamMemberController.getTeamMemberById);
teamMemberRouter.post('/', validate(teamMemberSchema), TeamMemberController.createTeamMember);
