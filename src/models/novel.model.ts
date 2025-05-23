import { Schema, model, Types, Document } from 'mongoose';
import { INovel, NovelStatus } from '../interfaces/novel.interface';

export type NovelDocument = INovel & Document;

const novelSchema = new Schema<NovelDocument>({
    writerAccountId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    tags: { type: [String], default: [] },
    coverImage: { type: Buffer },
    bannerImage: { type: Buffer },
    status: { type: String, enum: Object.values(NovelStatus), required: true },
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

novelSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const NovelModel = model<NovelDocument>('Novel', novelSchema);