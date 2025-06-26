import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/review.service';
import { CustomError } from '../utils/CustomError';

export const getReviewsByNovelId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundReviews = await reviewService.findReviewsByNovelId(req.params.novelId);
    if (!foundReviews) {
      throw new CustomError('No se encontraron reseñas para esta novela', 404);
    }
    res.json(foundReviews);
  } catch (error) {
    next(error);
  }
}

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const review = await reviewService.saveReview(req.body);
    if (!review) {
      throw new CustomError('No se pudo crear la reseña', 400);
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
}