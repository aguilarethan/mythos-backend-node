import { Router } from 'express';
import { 
    getChapterById, 
    getChaptersSummaryByNovelId, 
    createChapter, 
    updateChapterById,
    deleteChapterById 
} from '../controllers/chapter.controller';

const router = Router();

router.get('/:id', getChapterById);
router.get('/search/novel-id/:novelId', getChaptersSummaryByNovelId);
router.post('/', createChapter);
router.put('/:id', updateChapterById);
router.delete('/:id', deleteChapterById);

export default router;