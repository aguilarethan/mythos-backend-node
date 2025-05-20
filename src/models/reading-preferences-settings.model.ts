import { Schema, model, Types, Document } from 'mongoose';
import { IReadingPreferencesSettings } from '../interfaces/reading-preferences-settings.interface';

export type ReadingPreferencesSettingsDocument = IReadingPreferencesSettings & Document;

const readingPreferencesSettingsSchema = new Schema<ReadingPreferencesSettingsDocument>({
    accountId: { type: String, required: true },
    fontSize: { type: Number, required: true },
    fontFamily: { type: String, required: true },
    lineSpacing: { type: Number, required: true },
    theme: { type: String, enum: ['Claro', 'Oscuro'], required: true },
});

readingPreferencesSettingsSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

readingPreferencesSettingsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const ReadingPreferencesSettingsModel = model<ReadingPreferencesSettingsDocument>('ReadingPreferencesSettings', readingPreferencesSettingsSchema);
