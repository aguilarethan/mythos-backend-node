import { Schema, model, Types, Document } from 'mongoose';
import { INovel, NovelStatus } from '../interfaces/novel.interface';
import { IImageData } from '../interfaces/image-data.interface';

export type NovelDocument = INovel & Document;

const imageDataSchema = new Schema<IImageData>({
    imageId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageName: { type: String, required: true },
    size: { type: Number, required: true },
    format: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { _id: false });

const novelSchema = new Schema<NovelDocument>({
    writerAccountId: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
    tags: { type: [String], default: [] },
    coverImage: { type: imageDataSchema },
    bannerImage: { type: imageDataSchema },
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