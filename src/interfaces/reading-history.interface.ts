import { Types } from "mongoose";

export interface IReadingHistory {
    _id?: Types.ObjectId;
    accountId: string;
    novelId: Types.ObjectId;
    lastReadChapter: number;
    progressPercent: number;
    lastReadAt: Date;
}