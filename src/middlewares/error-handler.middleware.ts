import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import errorLogger from "../utils/error-logger.util";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;

    errorLogger.error({
        message: err.message,
        statusCode: statusCode,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        username: req.user ? req.user.username : 'anonymous',
        ip: req.ip,
        timestamp: new Date().toISOString()
    })

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? 'Error interno del servidor' : err.message,
    });
}