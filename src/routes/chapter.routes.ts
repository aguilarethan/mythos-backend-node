import { Router } from 'express';
import {
    createChapter,
    getChaptersByNovel,
    getChapterById,
} from '../controllers/chapter.controller';
import {
    createChapterSchema,
} from '../schemas/chapter.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.post('/', validateToken, validateRole(['writer']), validateSchema(createChapterSchema, 'body'), createChapter);

router.get('/novel/:novelId', getChaptersByNovel);

router.get('/:id', getChapterById);

export default router;