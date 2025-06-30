import { Request, Response, NextFunction } from 'express';    
import * as chapterService from '../services/chapter.service';
import { CustomError } from '../utils/CustomError';

export const getChapterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chapter = await chapterService.findChapterById(req.params.id);
        if (!chapter) {
            throw new CustomError('Capítulo no encontrado', 404);
        }
        res.json(chapter);
    } catch (error) {
        next(error);
    }
}

export const getChaptersByNovelId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const foundChapters = await chapterService.findChaptersByNovelId(req.params.novelId);
        if (!foundChapters || foundChapters.length === 0) {
            throw new CustomError('No se encontraron capítulos para esta novela', 404);
        }
        res.json(foundChapters);
    } catch (error) {
        next(error);
    }
}

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

export const generateChapterPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { chapterNumber, title, content } = req.body;

    const pdfBuffer = await chapterService.generateChapterPDF(chapterNumber, title, content);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="capitulo-${chapterNumber}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
