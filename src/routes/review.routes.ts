import { Router } from 'express';
import {
    createReview,
} from '../controllers/review.controller';

import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.post('/', validateToken, validateRole(['reader', 'writer']), createReview);

export default router;
