import { Router } from 'express';
import {
  getReadingPreferencesSettingsByAccountId,
  createReadingPreferencesSettings,
  updateReadingPreferencesSettingsByAccountId
} from '../controllers/reading-preferences-settings.controller';

const router = Router();

router.get('/:accountId', getReadingPreferencesSettingsByAccountId);
router.post('/', createReadingPreferencesSettings);
router.put('/:accountId', updateReadingPreferencesSettingsByAccountId);

export default router;
