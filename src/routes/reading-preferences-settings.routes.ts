import { Router } from 'express';
import {
  getReadingPreferencesSettingsByAccountId,
  createReadingPreferencesSettings,
  updateReadingPreferencesSettingsByAccountId
} from '../controllers/reading-preferences-settings.controller';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { accountIdParamSchema, preferencesSchema, updatePreferencesSchema } from '../schemas/reading-preferences-settings.schema';
import { validateToken } from '../middlewares/validate-token.middleware';
import { validateRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/:accountId', validateToken, validateRole(['reader', 'writer']), validateSchema(accountIdParamSchema, 'params'), getReadingPreferencesSettingsByAccountId);
router.post('/', validateToken, validateRole(['reader', 'writer']), validateSchema(preferencesSchema, 'body'), createReadingPreferencesSettings);
router.put('/:accountId', validateToken, validateRole(['reader', 'writer']), validateSchema(accountIdParamSchema, 'params'), validateSchema(updatePreferencesSchema, 'body'), updateReadingPreferencesSettingsByAccountId);

export default router;
