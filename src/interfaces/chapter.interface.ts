import { Types } from "mongoose";

export interface IChapter {
    _id?: Types.ObjectId;
    novelId: Types.ObjectId;
    volumeId?: Types.ObjectId;
    chapterNumber: number;
    title: string;
    content: string;
    priceMythras: number;
    createdAt?: Date;
    updatedAt?: Date;
}