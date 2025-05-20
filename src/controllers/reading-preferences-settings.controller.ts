import { Request, Response } from 'express';
import { ReadingPreferencesSettingsModel } from '../models/reading-preferences-settings.model';

export const getReadingPreferencesSettingsByAccountId = async (req: Request, res: Response) => {
  const { accountId } = req.params;

  try {
    const settings = await ReadingPreferencesSettingsModel.findOne({ accountId });

    if (!settings) {
      res.status(404).json({ message: 'No se encontraron preferencias para esta cuenta' });
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar obtener las preferencias' });
  }
};

export const createReadingPreferencesSettings = async (req: Request, res: Response) => {
  const { accountId, fontSize, fontFamily, lineSpacing, theme } = req.body;

  try {
    const existing = await ReadingPreferencesSettingsModel.findOne({ accountId });
    if (existing) {
      res.status(400).json({ message: 'Ya existen preferencias para esta cuenta' });
    }

    const newSettings = new ReadingPreferencesSettingsModel({
      accountId,
      fontSize,
      fontFamily,
      lineSpacing,
      theme
    });

    const savedSettings = await newSettings.save();
    res.json(savedSettings);
  } catch (error) {
    console.error('Error creating settings:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar crear las preferencias' });
  }
};

export const updateReadingPreferencesSettingsByAccountId = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const { fontSize, fontFamily, lineSpacing, theme } = req.body;

  try {
    const updatedSettings = await ReadingPreferencesSettingsModel.findOneAndUpdate(
      { accountId },
      { fontSize, fontFamily, lineSpacing, theme },
      { new: true }
    );

    if (!updatedSettings) {
      res.status(404).json({ message: 'No se encontraron preferencias para actualizar' });
    }

    res.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Ocurrió un error al intentar actualizar las preferencias' });
  }
};


