import { Schema, model, Types, Document } from 'mongoose';
import { IReview } from '../interfaces/review.interface';

export type ReviewDocument = IReview & Document;

const reviewSchema = new Schema<ReviewDocument>({
    novelId: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    accountId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});

reviewSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

reviewSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const ReviewModel = model<ReviewDocument>('Review', reviewSchema);