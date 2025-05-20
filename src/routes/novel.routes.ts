import { Router } from 'express';
import { createNovel } from '../controllers/novel.controller';

const router = Router();

router.post('/', createNovel);

export default router;