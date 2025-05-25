import { Router } from 'express';
import { 
    getNovelsByTitleMatch, 
    getNovelById, 
    getNovelsByWriterAccountId,
    createNovel, 
    updateNovelById,
    deleteNovelById 
} from '../controllers/novel.controller';
import { 
    novelIdParamSchema, 
    novelTitleParamSchema,
    writerAccountIdParamSchema,
    createNovelSchema, 
    updateNovelSchema 
} from '../schemas/novel.schema';
import { validateSchema } from '../middlewares/schema-validator.middleware';

const router = Router();

router.get('/:id', validateSchema(novelIdParamSchema, 'params'), getNovelById);
router.get('/search/title/:title', validateSchema(novelTitleParamSchema, 'params'), getNovelsByTitleMatch);
router.get('/search/writer/:writerAccountId', validateSchema(writerAccountIdParamSchema, 'params'), getNovelsByWriterAccountId);
router.post('/', validateSchema(createNovelSchema, 'body'), createNovel);
router.put('/:id', validateSchema(novelIdParamSchema, 'params'), validateSchema(updateNovelSchema, 'body'), updateNovelById);
router.delete('/:id', validateSchema(novelIdParamSchema, 'params'), deleteNovelById);

export default router;