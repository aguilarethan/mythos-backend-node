import { Router } from 'express';
import { uploadFile } from '../middlewares/upload-file.middleware';
import {
    getNovelsByTitleMatch,
    getNovelById,
    getNovelsByWriterAccountId,
    getNovelsByGenre,
    getLastThreeNovelsPreview,
    getEightMostViewedNovelsPreview,
    uploadNovelCoverImage,
    createNovel,
    updateNovelById,
    deleteNovelById,
    getAuthorNovelStats
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
router.get('/search/genre/:genre', getNovelsByGenre);
router.get('/search/last-three-preview', getLastThreeNovelsPreview);
router.get('/search/eight-most-viewed-preview', getEightMostViewedNovelsPreview);

router.post('/upload/cover-image', validateToken, validateRole(['writer']), uploadFile.single('coverImage'), uploadNovelCoverImage);
router.post('/', validateToken, validateRole(['writer']), validateSchema(createNovelSchema, 'body'), createNovel);
router.post('/author/chapters/stats', validateToken, validateRole(['writer']), getAuthorNovelStats);


router.put('/:id', validateToken, validateRole(['writer']), validateSchema(novelIdParamSchema, 'params'), validateSchema(updateNovelSchema, 'body'), updateNovelById);
router.delete('/:id', validateToken, validateRole(['writer']), validateSchema(novelIdParamSchema, 'params'), deleteNovelById);

export default router;