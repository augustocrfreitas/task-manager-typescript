import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../@types/express';

type TokenPayload = {
    id: string;
    name: string;
    email: string;
} & JwtPayload;

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(400).json({ error: 'Usuário não autenticado' });
        console.log('usuario não autenticado');
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as TokenPayload;
        req.user = decoded;
        next();
    } catch (error) {
        const err = error as Error;
        res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
