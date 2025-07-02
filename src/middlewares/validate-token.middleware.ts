import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPayload } from '../interfaces/token-payload.interface';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies?.accessToken;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring('Bearer '.length).trim();
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado en cookies ni en encabezado Authorization' });
        return;
    }

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
};



