export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    teamId: string;
    createdBy: string;
    assigneeTo?: string;
}

export type CreateTaskInput = Omit<Task, 'completed' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>;
