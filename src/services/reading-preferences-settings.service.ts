import { ReadingPreferencesSettingsModel } from "../models/reading-preferences-settings.model";
import { IReadingPreferencesSettings } from "../interfaces/reading-preferences-settings.interface";

export const findPreferencesByAccountId = async (accountId: string) => {
    return ReadingPreferencesSettingsModel.findOne({ accountId: accountId });
};

export const savePreferences = async (preferencesData: IReadingPreferencesSettings) => {
    const newPrefs = new ReadingPreferencesSettingsModel(preferencesData);
    return newPrefs.save();
};

export const findPreferencesByAccountIdAndUpdate = async (accountId: string, updatePreferencesData: Partial<IReadingPreferencesSettings>) => {
    return ReadingPreferencesSettingsModel.findOneAndUpdate({ accountId: accountId }, updatePreferencesData, { new: true });
};