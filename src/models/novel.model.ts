import { Schema, model, Types, Document } from 'mongoose';
import { INovel, NovelStatus } from '../interfaces/novel.interface';

export type NovelDocument = INovel & Document;

const novelSchema = new Schema<NovelDocument>({
    writerAccountId: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    tags: { type: [String], default: [] },
    coverImage: { type: String },
    bannerImage: { type: String },
    status: { type: String, enum: Object.values(NovelStatus), default: NovelStatus.IN_PROGRESS, required: true },
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