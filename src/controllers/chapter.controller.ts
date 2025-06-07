import { Request, Response } from 'express';    
import * as chapterService from '../services/chapter.service';

export const getChapterById = async (req: Request, res: Response) => {
    try {
        const chapter = await chapterService.findChapterById(req.params.id);
        if (!chapter) res.status(404).json({ message: 'No se encontró el capítulo' });
        res.json(chapter);
    } catch (error) {
        console.error('Error fetching chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar buscar el capítulo' });
    }
}

export const getChaptersSummaryByNovelId = async (req: Request, res: Response) => {
    try {
        const foundChaptersSummary = await chapterService.findChaptersSummaryByNovelId(req.params.novelId);
        if (foundChaptersSummary.length === 0) res.status(404).json({ message: 'No se encontraron capítulos para esta novela' });
        res.json(foundChaptersSummary);
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar buscar los capítulos' });
    }
}

export const createChapter = async (req: Request, res: Response) => {
    try {
        const chapter = await chapterService.saveChapter(req.body);
        res.status(201).json(chapter);
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar crear el capítulo' });
    }
}

export const updateChapterById = async (req: Request, res: Response) => {
    try {
        const updatedChapter = await chapterService.findChapterByIdAndUpdate(req.params.id, req.body);
        if (!updatedChapter) res.status(404).json({ message: 'No se encontró el capítulo' });
        res.json(updatedChapter);
    } catch (error) {
        console.error('Error updating chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el capítulo' });
    }
}

export const deleteChapterById = async (req: Request, res: Response) => {
    try {
        const deletedChapter = await chapterService.findChapterByIdAndDelete(req.params.id);
        if (!deletedChapter) res.status(404).json({ message: 'No se encontró el capítulo' });
        res.json({ message: 'Capítulo eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar eliminar el capítulo' });
    }
}