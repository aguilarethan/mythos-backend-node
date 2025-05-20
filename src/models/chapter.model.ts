import { Schema, model, Types, Document } from 'mongoose';
import { IChapter } from '../interfaces/chapter.interface';

export type ChapterDocument = IChapter & Document;

const chapterSchema = new Schema<ChapterDocument>({
    novelId: { type: Schema.Types.ObjectId, ref:'Novel', required: true },
    number: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    priceMythras: { type: Number, required: true },
    isFree: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
});

chapterSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

chapterSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const ChapterModel = model<ChapterDocument>('Chapter', chapterSchema);
