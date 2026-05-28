import { ZodError, ZodType } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            req.body = schema.parse(req.body);
            console.log('Saida do Validate middleware: ', req.body.name);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.map((err) => ({
                    messagemDeErro: err.message,
                }));
                res.status(400).json({ erros: formattedErrors });
            } else {
                next(error);
            }
        }
    };
};
