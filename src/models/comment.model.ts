import { Schema, model, Types, Document } from 'mongoose';
import { IComment, IReply } from '../interfaces/comment.interface';

export type CommentDocument = IComment & Document;

const replySchema = new Schema<IReply>({
    accountId: { type: String, required: true },
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    },
    { _id: true } 
);

const commentSchema = new Schema<CommentDocument>({
    chapterId: { type: Schema.Types.ObjectId, ref:'Chapter', required: true },
    accountId: { type: String, required: true },
    message: { type: String, required: true },
    replies: { type: [replySchema], default: [] },
    likes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});

commentSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const CommentModel = model<CommentDocument>('Comment', commentSchema);