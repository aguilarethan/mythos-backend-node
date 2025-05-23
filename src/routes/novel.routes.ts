import { Router } from 'express';
import { 
    getNovelsByTitleMatch, 
    getNovelById, 
    getNovelsByWriterAccountId,
    createNovel, 
    updateNovelById,
    deleteNovelById 
} from '../controllers/novel.controller';

const router = Router();

router.get('/:id', getNovelById);
router.get('/search/title/:title', getNovelsByTitleMatch);
router.get('/search/writer/:writerAccountId', getNovelsByWriterAccountId);
router.post('/', createNovel);
router.put('/:id', updateNovelById);
router.delete('/:id', deleteNovelById);

export default router;