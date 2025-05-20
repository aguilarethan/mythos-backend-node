import { Request, Response } from 'express';
import { ReadingHistoryModel } from '../models/reading-history.model';

export const getReadingHistoryByAccount = async (req: Request, res: Response) => {
    const { accountId } = req.params;

    try {
        const history = await ReadingHistoryModel.find({ accountId }).populate('novelId');
        res.json(history);
    } catch (error) {
        console.error('Error fetching reading history:', error);
        res.status(500).json({ message: 'Error al obtener el historial de lectura' });
    }
};

export const upsertReadingHistory = async (req: Request, res: Response) => {
    const { accountId, novelId, lastReadChapter, progressPercent } = req.body;

    try {
        const updatedHistory = await ReadingHistoryModel.findOneAndUpdate(
            { accountId, novelId },
            {
                lastReadChapter,
                progressPercent,
                lastReadAt: new Date(),
            },
            { upsert: true, new: true }
        );

        res.json(updatedHistory);
    } catch (error) {
        console.error('Error updating/creating reading history:', error);
        res.status(500).json({ message: 'Error al actualizar o crear el historial' });
    }
};

