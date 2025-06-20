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

export const getChaptersByNovel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { novelId } = req.params;
    const chapters = await chapterService.findChaptersByNovelId(novelId);

    if (!chapters || chapters.length === 0) {
      return res.status(404).json({ message: 'No se encontraron capítulos para esta novela.' });
    }

    res.json(chapters);
  } catch (error) {
    next(error);
  }
};

export const getChapterById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const chapter = await chapterService.findChapterById(id);

    if (!chapter) {
      return res.status(404).json({ message: 'Capítulo no encontrado.' });
    }

    res.json(chapter);
  } catch (error) {
    next(error);
  }
};
