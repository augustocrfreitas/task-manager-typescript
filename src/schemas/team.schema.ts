import z from 'zod';

export const teamChema = z.object({
    name: z.string().min(3, 'O nome do time deve ter pelo menos 3 digitos'),
});
