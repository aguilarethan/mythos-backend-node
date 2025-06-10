import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPayload } from '../interfaces/token-payload.interface';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado o formato inválido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        if (typeof decoded === 'string') {
            res.status(401).json({ message: 'Token inválido: el payload no es un objeto' });
            return;
        }

        req.user = decoded as ITokenPayload; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
}


