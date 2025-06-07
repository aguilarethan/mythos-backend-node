import { Types } from "mongoose";

export interface IVolume {
    _id?: Types.ObjectId;
    novelId: Types.ObjectId;
    volumeNumber: number;
    title: string;
    createdAt?: Date;
    updatedAt?: Date;
}