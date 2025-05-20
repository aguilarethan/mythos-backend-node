import { Request, Response } from 'express';
import { NovelModel } from '../models/novel.model';

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
    res.status(500).json({ message: 'Error creating novel' });
  }

};
