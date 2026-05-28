import z from 'zod';

const passwordValidate = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/);

export const userSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
    email: z.email('E-mail no formato incorreto.'),
    password: z
        .string()
        .regex(
            passwordValidate,
            'A senha deve ter pelo menos 6 digitos, com uma letra e um número',
        ),
});

export const loginSchema = z.object({
    email: z.email('E-mail no formato incorreto.'),
    password: z.string().min(1, 'A senha é obrigatória'),
});

export const createSchema = z.object({
    email: z.email('insira um email valido'),
    password: z.string().min(3, 'digite a senha'),
});
