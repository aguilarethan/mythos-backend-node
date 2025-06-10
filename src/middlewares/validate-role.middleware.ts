import { Request, Response, NextFunction } from 'express';

export const validateRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user; 
        if (!user || !user.role) {
            res.status(403).json({ message: 'Acceso denegado: rol no proporcionado' });
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            res.status(403).json({ message: 'Acceso denegado: rol no autorizado' });
            return;
        }
        next();
    };
}