import z from 'zod';

const regexUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const teamMemberSchema = z.object({
    userId: z.string().regex(regexUuid, 'O id está incorreto'),
    teamId: z.string().regex(regexUuid, 'O id está incorreto'),
});
