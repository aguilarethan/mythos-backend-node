import { Schema, model, Types, Document } from 'mongoose';
import { INovel } from '../interfaces/novel.interface';

export type NovelDocument = INovel & Document;

const novelSchema = new Schema<NovelDocument>({
    writerAccountId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    tags: { type: [String], default: [] },
    coverImage: { type: Buffer, required: false },
    bannerImage: { type: Buffer, required: false },
    status: { type: String, enum: ['En curso', 'Pausada', 'Terminada', 'Reportada', 'Desactivada'], required: true },
    createdAt: { type: Date, default: Date.now },
});

novelSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

novelSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const NovelModel = model<NovelDocument>('Novel', novelSchema);