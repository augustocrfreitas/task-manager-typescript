import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(400).json({ error: 'Usuário não autenticado' });
    console.log('usuario não autenticado');
    return;
  }

  const token = authHeader.split(' ')[1];
  const isValidJwt = jwt.verify(token, process.env.SECRET_KEY as string);

  if (!isValidJwt) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }

  next();
};
