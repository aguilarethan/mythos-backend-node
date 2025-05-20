import { Schema, model, Types, Document } from 'mongoose';
import { IReadingHistory } from '../interfaces/reading-history.interface';

export type ReadingHistoryDocument = IReadingHistory & Document;

const readingHistorySchema = new Schema<ReadingHistoryDocument>({
    accountId: { type: String, required: true },
    novelId: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    lastReadChapter: { type: Number, required: true },
    progressPercent: { type: Number, required: true },
    lastReadAt: { type: Date, default: Date.now },
});

readingHistorySchema.virtual('id').get(function() {
    return this._id.toHexString();
});

readingHistorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const ReadingHistoryModel = model<ReadingHistoryDocument>('ReadingHistory', readingHistorySchema);