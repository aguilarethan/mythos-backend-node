import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/review.service';
import { CustomError } from '../utils/CustomError';

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