import { Router } from 'express';
import {
  getReviewsByNovelId,
  createReview,
  updateReviewById,
  deleteReviewById
} from '../controllers/review.controller';

const router = Router();

router.get('/search/:novelId', getReviewsByNovelId);
router.post('/', createReview);
router.put('/:id', updateReviewById);
router.delete('/:id', deleteReviewById);

export default router;
