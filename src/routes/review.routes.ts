import { Router } from 'express';
import {
    getReviewsByNovelId,
    createReview,
} from '../controllers/review.controller';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/search/novel-id/:novelId', getReviewsByNovelId);
router.post('/', validateToken, validateRole(['reader', 'writer']), createReview);

export default router;