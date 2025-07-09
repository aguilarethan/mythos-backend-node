import { Router } from 'express';
import {
    getChapterById,
    getChaptersByNovelId,
    createChapter,
    generateChapterPDF,
    updateChapter,
} from '../controllers/chapter.controller';
import {
    createChapterSchema,
} from '../schemas/chapter.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/:id', getChapterById);
router.get('/novel/:novelId', getChaptersByNovelId);
router.post('/', validateToken, validateRole(['writer']), validateSchema(createChapterSchema, 'body'), createChapter);
router.post('/generate-pdf', validateToken, generateChapterPDF);
router.put('/:id', validateToken, validateRole(['writer']), updateChapter);

export default router;
