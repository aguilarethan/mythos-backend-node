import { Schema, model, Document } from 'mongoose';
import { IComment, IReply } from '../interfaces/comment.interface';

export type CommentDocument = IComment & Document;

const replySchema = new Schema<IReply>({
    accountId: { type: String, required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
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

const commentSchema = new Schema<CommentDocument>({
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    accountId: { type: String, required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    replies: { type: [replySchema], default: [] },
    likes: { type: Number, default: 0 },
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

commentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

export const CommentModel = model<CommentDocument>('Comment', commentSchema);