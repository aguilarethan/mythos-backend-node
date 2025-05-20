import { Request, Response } from 'express';    
import { ChapterModel } from '../models/chapter.model';

export const getChapterById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const foundChapter = await ChapterModel.findById(id);
        if (!foundChapter) {
            res.status(404).json({ message: 'No se encontró el capítulo' });
        }

        res.json(foundChapter);
    } catch (error) {
        console.error('Error fetching chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar buscar el capítulo' });
    }
}

export const getChaptersByNovelId = async (req: Request, res: Response) => {
    const { novelId } = req.params;

    try {
        const foundChapters = await ChapterModel.find({ novelId });
        if (foundChapters.length === 0) {
            res.status(404).json({ message: 'No se encontraron capítulos para esta novela' });
        }

        res.json(foundChapters);
    } catch (error) {
        console.error('Error fetching chapters:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar buscar los capítulos' });
    }
}

export const createChapter = async (req: Request, res: Response) => {
    const { novelId, number, title, content, priceMythras, isFree } = req.body;

    const newChapter = new ChapterModel({
        novelId,
        number,
        title,
        content,
        priceMythras,
        isFree
    });

    try {
        const chapterSaved = await newChapter.save();
        res.json(chapterSaved);
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar crear el capítulo' });
    }
}

export const updateChapterById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { novelId, number, title, content, priceMythras, isFree } = req.body;

    try {
        const updatedChapter = await ChapterModel.findByIdAndUpdate(
            id,
            { novelId, number, title, content, priceMythras, isFree },
            { new: true }
        );

        if (!updatedChapter) {
            res.status(404).json({ message: 'No se encontró el capítulo' });
        }

        res.json(updatedChapter);
    } catch (error) {
        console.error('Error updating chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el capítulo' });
    }
}

export const deleteChapterById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedChapter = await ChapterModel.findByIdAndDelete(id);
        if (!deletedChapter) {
            res.status(404).json({ message: 'No se encontró el capítulo' });
        }

        res.json({ message: 'Capítulo eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting chapter:', error);
        res.status(500).json({ message: 'Ocurrió un error al intentar eliminar el capítulo' });
    }

}