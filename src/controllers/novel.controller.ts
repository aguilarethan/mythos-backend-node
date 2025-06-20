import { Request, Response, NextFunction } from 'express';
import * as novelService from '../services/novel.service';
import { CustomError } from '../utils/CustomError';
import { cloudinary } from '../config/cloudinary-config';
import streamifier from 'streamifier';

export const getNovelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const novel = await novelService.findNovelById(req.params.id);
    if (!novel) {
      throw new CustomError('No se encontró la novela', 404);
    }
    res.json(novel);
  } catch (error) {
    next(error);
  }
};

export const getNovelsByTitleMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundNovels = await novelService.findNovelsByTitleMatch(req.params.title);
    if (foundNovels.length === 0) {
      throw new CustomError('No se encontraron novelas con ese título', 404);
    }
    res.json(foundNovels)
  } catch (error) {
    next(error);
  }
};

export const getNovelsByWriterAccountId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundNovels = await novelService.findNovelsByWriterAccountId(req.params.writerAccountId);
    if (foundNovels.length === 0) {
      throw new CustomError('No se encontraron novelas para este escritor', 404);
    }
    res.json(foundNovels);
  } catch (error) {
    next(error);
  }
};

export const getLastThreeNovelsPreview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundNovels = await novelService.findLastThreeNovelsPreview();
    if (foundNovels.length === 0) {
      throw new CustomError('No se encontraron novelas recientes', 404);
    }
    res.json(foundNovels);
  } catch (error) {
    next(error);
  }
};

export const uploadNovelCoverImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file?.buffer) {
      const stream = streamifier.createReadStream(req.file.buffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'novels-covers' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.pipe(uploadStream);
      });

      res.json(uploadResult.secure_url );
    }
  } catch (error) {
    next(error);
  }
}

export const createNovel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const novel = await novelService.saveNovel(req.body);
    if (!novel) {
      throw new CustomError('No se pudo crear la novela', 500);
    }
    res.json(novel);
  } catch (error) {
    next(error);
  }
};

export const updateNovelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedNovel = await novelService.findNovelByIdAndUpdate(req.params.id, req.body);
    if (!updatedNovel) {
      throw new CustomError('No se encontró la novela para actualizar', 404);
    }
    res.json(updatedNovel);
  } catch (error) {
    next(error);
  }
};

export const deleteNovelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedNovel = await novelService.findNovelByIdAndDelete(req.params.id);
    if (!deletedNovel) {
      throw new CustomError('No se encontró la novela para eliminar', 404);
    }
    res.json({ message: 'Novela eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};