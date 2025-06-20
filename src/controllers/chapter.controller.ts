import { Request, Response, NextFunction } from 'express';    
import * as chapterService from '../services/chapter.service';
import { CustomError } from '../utils/CustomError';



export const createChapter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chapter = await chapterService.saveChapter(req.body);
        if (!chapter) {
            throw new CustomError('No se pudo crear el capítulo', 400);
        }
        res.json(chapter);
    } catch (error) {
        next(error);
    }
}
