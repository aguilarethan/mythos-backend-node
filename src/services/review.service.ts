import { ReviewModel } from "../models/review.model";
import { IReview } from "../interfaces/review.interface";

export const findReviewsByNovelId = async (novelId: string) => {
    return ReviewModel.find({ novelId }).sort({ createdAt: -1 });
}

export const saveReview = async (reviewData: IReview) => {
    const newReview = new ReviewModel(reviewData);
    return newReview.save();
}