import { Types } from 'mongoose';

export interface INovel {
    _id?: Types.ObjectId;
    writerAccountId: string;
    title: string;
    description: string;
    genres: Types.ObjectId[];
    tags: string[];
    coverImage: Buffer;
    bannerImage: Buffer;
    status: string;
    createdAt: Date;
}