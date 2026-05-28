export interface TeamMember {
    id: string;
    userId: string;
    teamId: string;
}

export type CreateTeamMemberInput = Omit<TeamMember, 'id'>;
