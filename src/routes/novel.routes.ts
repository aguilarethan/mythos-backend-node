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
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/:id', validateSchema(novelIdParamSchema, 'params'), getNovelById);
router.get('/search/title/:title', validateSchema(novelTitleParamSchema, 'params'), getNovelsByTitleMatch);
router.get('/search/writer/:writerAccountId', validateToken, validateRole(['writer']), validateSchema(writerAccountIdParamSchema, 'params'), getNovelsByWriterAccountId);
router.post('/', validateToken, validateRole(['writer']), validateSchema(createNovelSchema, 'body'), createNovel);
router.put('/:id', validateToken, validateRole(['writer']), validateSchema(novelIdParamSchema, 'params'), validateSchema(updateNovelSchema, 'body'), updateNovelById);
router.delete('/:id', validateToken, validateRole(['writer']), validateSchema(novelIdParamSchema, 'params'), deleteNovelById);

export default router;