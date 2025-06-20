import { Request, Response, NextFunction } from 'express';
import * as novelReportService from '../services/novel-report.service'
import { CustomError } from '../utils/CustomError';

export const createNovelReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const novelReport = await novelReportService.saveNovelReport(req.body);
    if (!novelReport) {
        throw new CustomError('No se pudo crear el reporte de la novela', 500);
    }
    res.json(novelReport);
  } catch (error) {
    next(error);
  }
};