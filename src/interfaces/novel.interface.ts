import { Types } from 'mongoose';
import { IGenre } from './genre.interface';

export enum NovelStatus {
    IN_PROGRESS = 'En curso',
    PAUSED = 'Pausada',
    COMPLETED = 'Terminada',
    REPORTED = 'Reportada',
    DEACTIVATED = 'Desactivada'
}

export interface INovel {
    _id?: Types.ObjectId;
    writerAccountId: string;
    title: string;
    description: string;
    genres: (Types.ObjectId | IGenre)[];
    tags: string[];
    coverImage?: string;
    bannerImage?: string;
    status: NovelStatus;
    createdAt?: Date;
    updatedAt?: Date;
}