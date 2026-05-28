import { TeamRepository } from '../repositories/team.respository.js';
import { CreateTeamInput, Team } from '../models/team.model.js';

export class TeamService {
  static async getTeams(): Promise<Team[]> {
    const result = await TeamRepository.getAllTeams();

    if (result.length === 0) {
      throw new Error('Não existe nenhum time cadastrado');
    }

    return result;
  }

  static async getTeamById(id: string): Promise<Team> {
    const result = await TeamRepository.getTeamById(id);

    if (!result) {
      throw new Error('Time não existe');
    }
    return result;
  }

  static async createTeam(name: CreateTeamInput): Promise<Team> {
    const result = await TeamRepository.createTeam(name);

    return result;
  }
}
