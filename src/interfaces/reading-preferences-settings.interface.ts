import { Types } from "mongoose";

export interface IReadingPreferencesSettings {
    _id?: Types.ObjectId;
    accountId: string;
    fontSize: number;
    fontFamily: string;
    lineSpacing: number;
    theme: string;
}