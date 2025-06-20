import { Router } from 'express';
import {
    createChapter,
} from '../controllers/chapter.controller';
import {
    createChapterSchema,
} from '../schemas/chapter.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.post('/', validateToken, validateRole(['writer']), validateSchema(createChapterSchema, 'body'), createChapter);


export default router;