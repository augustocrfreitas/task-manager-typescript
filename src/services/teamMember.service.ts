import { Team } from '../models/team.model';
import { CreateTeamMemberInput, TeamMember } from '../models/teamMember.model';
import TeamMemberRepository from '../repositories/teamMember.repository';

export default class TeamMemberService {
    static async getTeamMembers(): Promise<TeamMember[]> {
        const result = await TeamMemberRepository.getTeamMembers();

        if (result.length === 0) {
            throw new Error('Não existem TeamMembers cadastrados');
        }
        return result;
    }

    static async getTeamMemberById(id: string): Promise<TeamMember> {
        const result = await TeamMemberRepository.getTeamMemberById(id);

        if (!result) {
            throw new Error('O teamMember informado não existe');
        }
        return result;
    }

    static async createTeamMember(data: CreateTeamMemberInput): Promise<TeamMember> {
        const result = await TeamMemberRepository.createTeamMember(data);
        return result;
    }
}
