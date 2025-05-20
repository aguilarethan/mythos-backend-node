import { Request, Response } from 'express';
import { ReviewModel } from '../models/review.model';


export const getReviewsByNovelId = async (req: Request, res: Response) => {
  const { novelId } = req.params;

  try {
    const reviews = await ReviewModel.find({ novelId }).sort({ date: -1 });
    if (reviews.length === 0) {
      res.status(404).json({ message: 'No se encontraron reseñas para esta novela' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Ocurrió un error al obtener las reseñas' });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { novelId, accountId, rating, comment } = req.body;

  const newReview = new ReviewModel({
    novelId,
    accountId,
    rating,
    comment
  });

  try {
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Ocurrió un error al crear la reseña' });
  }
};

export const updateReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment, likes } = req.body;

  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { rating, comment, likes },
      { new: true }
    );

    if (!updatedReview) {
      res.status(404).json({ message: 'No se encontró la reseña' });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar la reseña' });
  }
};

export const deleteReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    if (!deletedReview) {
      res.status(404).json({ message: 'No se encontró la reseña' });
    }

    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar la reseña' });
  }
};
