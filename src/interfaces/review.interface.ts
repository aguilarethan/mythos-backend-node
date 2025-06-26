import { Types } from "mongoose";

export interface IReview {
    _id?: Types.ObjectId;
    novelId: Types.ObjectId;
    accountId: string;
    rating: number;
    comment: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}