import { Router } from 'express';
import { 
getNovelsByPartialTitleMatch, 
getNovelById, 
createNovel, 
updateNovelById,
deleteNovelById } from '../controllers/novel.controller';

const router = Router();

router.get('/:id', getNovelById);
router.get('/search/:title', getNovelsByPartialTitleMatch);
router.post('/', createNovel);
router.put('/:id', updateNovelById);
router.delete('/:id', deleteNovelById);

export default router;