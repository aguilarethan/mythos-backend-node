import { Types } from "mongoose";

export interface IChapter {
    _id?: Types.ObjectId;
    novelId: Types.ObjectId;
    number: number;
    title: string;
    content: string;
    priceMythras: number;
    isFree: boolean;
    publishedAt: Date;
}