import { Request, Response } from 'express';
import { NovelModel } from '../models/novel.model';

export const getNovelById = async (req: Request, res: Response) => { 
  const { id } = req.params;

  try {
    const foundedNovel = await NovelModel.findById(id);
    if (!foundedNovel) {
      res.status(404).json({ message: 'No se encontró la novela' });
    }

    res.json(foundedNovel);
  } catch (error) { 
    console.error('Error fetching novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar buscar la novela' });
  }

}

export const getNovelsByPartialTitleMatch = async (req: Request, res: Response) => {
  const { title } = req.params;

  try {
    const foundNovels = await NovelModel.find({
      title: { $regex: title, $options: 'i' } 
    });

    if (foundNovels.length === 0) {
      res.status(404).json({ message: 'No se encontraron novelas con titulos coincidentes' });
    }

    res.json(foundNovels)
  } catch (error) {
    console.error('Error fetching novels:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar buscar las novelas' });
  }
};

export const createNovel = async (req: Request, res: Response) => {
  const { writerAccountId, title, description, genres, tags, coverImage, bannerImage, status, createdAt } = req.body;

  const newNovel = new NovelModel({
    writerAccountId,
    title,
    description,
    genres,
    tags,
    coverImage,
    bannerImage,
    status,
    createdAt
  });

  try {
    const novelSaved = await newNovel.save();
    res.json(novelSaved);
  } catch (error) {
    console.error('Error creating novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar crear la novela' });
  }

};

export const updateNovelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, genres, tags, coverImage, bannerImage, status, createdAt } = req.body;

  try {
    const updatedNovel = await NovelModel.findByIdAndUpdate(
      id,
      { title, description, genres, tags, coverImage, bannerImage, status, createdAt },
      { new: true }
    );

    if (!updatedNovel) {
      res.status(404).json({ message: 'No se encontró la novela' });
    }

    res.json(updatedNovel);
  } catch (error) {
    console.error('Error updating novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar actualizar la novela' });
  }
};

export const deleteNovelById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedNovel = await NovelModel.findByIdAndDelete(id);
    if (!deletedNovel) {
      res.status(404).json({ message: 'No se encontró la novela' });
    }

    res.json({ message: 'Novela eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting novel:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar eliminar la novela' });
  }
};
