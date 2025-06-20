import { Router } from "express";
import {
  createNovelReport,
} from '../controllers/novel-report.controller';
import {
  createNovelReportSchema,
} from '../schemas/novel-report.schema';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.post('/', validateToken, validateRole(['reader', 'writer']), validateSchema(createNovelReportSchema, 'body'), createNovelReport)

export default router;