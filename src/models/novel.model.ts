import { Schema, model, Document } from 'mongoose';
import { INovel, NovelStatus } from '../interfaces/novel.interface';

export type NovelDocument = INovel & Document;

const novelSchema = new Schema<NovelDocument>({
    writerAccountId: { type: String, required: true },
    writerName: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    genres: { type: [String], required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true },
    coverImageUrl: { type: String, require: true },
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