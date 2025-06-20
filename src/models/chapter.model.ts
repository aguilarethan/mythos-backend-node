import { Schema, model, Document } from 'mongoose';
import { IChapter } from '../interfaces/chapter.interface';

export type ChapterDocument = IChapter & Document;

const chapterSchema = new Schema<ChapterDocument>({
    novelId: { type: Schema.Types.ObjectId, ref:'Novel', required: true },
    volumeId: { type: Schema.Types.ObjectId, ref: 'Volume', default: null },
    chapterNumber: { type: Number, min: 1 },
    title: { type: String, trim: true, required: true },
    content: { type: String, trim: true, required: true },
    priceMythras: { type: Number, min: 0, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    }
});

chapterSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

chapterSchema.virtual('isFree').get(function() {
    return this.priceMythras === 0;
});

export const ChapterModel = model<ChapterDocument>('Chapter', chapterSchema);
