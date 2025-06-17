import { Request, Response, NextFunction } from 'express';
import * as preferencesService from '../services/reading-preferences-settings.service';
import { CustomError } from '../utils/CustomError';

export const getReadingPreferencesSettingsByAccountId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await preferencesService.findPreferencesByAccountId(req.params.accountId);
    if (!settings) throw new CustomError('No se encontraron preferencias para esta cuenta', 404);
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const createReadingPreferencesSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await preferencesService.findPreferencesByAccountId(req.body.accountId);
    if (existing) throw new CustomError('Ya existen preferencias para esta cuenta', 400);
    const created = await preferencesService.savePreferences(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateReadingPreferencesSettingsByAccountId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await preferencesService.findPreferencesByAccountIdAndUpdate(req.params.accountId, req.body);
    if (!updated) throw new CustomError('No se encontraron preferencias para actualizar', 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};