import { ReviewModel } from "../models/review.model";
import { IReview } from "../interfaces/review.interface";

export const saveReview = async (reviewData: IReview) => {
    const newReview = new ReviewModel(reviewData);
    return newReview.save();
}