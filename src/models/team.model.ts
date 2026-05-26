export interface Team {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export type CreateTeamInput = Omit<Team, 'id' | 'createdAt' | 'updatedAt'>