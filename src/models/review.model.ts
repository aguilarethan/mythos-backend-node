import { Schema, model, Document } from 'mongoose';
import { IReview } from '../interfaces/review.interface';

export type ReviewDocument = IReview & Document;

const reviewSchema = new Schema<ReviewDocument>({
    novelId: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    accountId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

reviewSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const ReviewModel = model<ReviewDocument>('Review', reviewSchema);