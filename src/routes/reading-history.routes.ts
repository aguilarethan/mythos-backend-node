import { Router } from 'express';
import {
    getReadingHistoryByAccount,
    upsertReadingHistory
} from '../controllers/reading-history.controller';

const router = Router();

router.get('/:accountId', getReadingHistoryByAccount);
router.post('/', upsertReadingHistory);

export default router;
