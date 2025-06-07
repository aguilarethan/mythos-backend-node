import { Request, Response } from 'express';
import * as novelService from '../services/novel.service';

export const getNovelById = async (req: Request, res: Response) => { 
  try {
    const novel = await novelService.findNovelById(req.params.id);
    if (!novel) {
      res.status(404).json({ message: 'No se encontró la novela' });
      return;
    }
    res.json(novel);
  } catch (error) {
    console.error('Error fetching novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar buscar la novela' });
  }
};

export const getNovelsByTitleMatch = async (req: Request, res: Response) => {
  try {
    const foundNovels = await novelService.findNovelsByTitleMatch(req.params.title);
    if (foundNovels.length === 0) {
      res.status(404).json({ message: 'No se encontraron novelas con titulos coincidentes' });
      return;
    }
    res.json(foundNovels)
  } catch (error) {
    console.error('Error fetching novels:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar buscar las novelas' });
  }
};

export const getNovelsByWriterAccountId = async (req: Request, res: Response) => {
  try {
    const foundNovels = await novelService.findNovelsByWriterAccountId(req.params.writerAccountId);
    if (foundNovels.length === 0) {
      res.status(404).json({ message: 'No se encontraron novelas para este escritor' });
      return;
    }
    res.json(foundNovels);
  } catch (error) {
    console.error('Error fetching novels:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar buscar las novelas' });
  }
};

export const createNovel = async (req: Request, res: Response) => {
  try {
    const novel = await novelService.saveNovel(req.body);
    res.status(201).json(novel);
  } catch (error) {
    console.error('Error creating novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar crear la novela' });
  }
};

export const updateNovelById = async (req: Request, res: Response) => {
  try {
    const updatedNovel = await novelService.findNovelByIdAndUpdate(req.params.id, req.body);
    if (!updatedNovel) {
      res.status(404).json({ message: 'No se encontró la novela' });
      return;
    }
    res.json(updatedNovel);
  } catch (error) {
    console.error('Error updating novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar actualizar la novela' });
  }
};

export const deleteNovelById = async (req: Request, res: Response) => {
  try {
    const deletedNovel = await novelService.findNovelByIdAndDelete(req.params.id);
    if (!deletedNovel) {
      res.status(404).json({ message: 'No se encontró la novela' });
      return;
    }
    res.json({ message: 'Novela eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar eliminar la novela' });
  }
};