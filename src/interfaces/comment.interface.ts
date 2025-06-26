import { Types } from "mongoose";

export interface IReply {
    _id?: Types.ObjectId;
    accountId: string;
    message: string;
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComment { 
    _id?: Types.ObjectId;
    chapterId: Types.ObjectId;
    accountId: string;
    message: string;
    replies: IReply[];
    likes: number;
    createdAt?: Date;
    updatedAt?: Date;
}