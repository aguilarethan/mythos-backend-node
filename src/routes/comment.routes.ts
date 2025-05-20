import { Router } from 'express';
import { 
    getCommentsByChapterId,
    createComment,
    deleteCommentById
} from '../controllers/comment.controller';

const router = Router();

router.get('/chapter/:chapterId', getCommentsByChapterId);
router.post('/', createComment);
router.delete('/:id', deleteCommentById);

export default router;
