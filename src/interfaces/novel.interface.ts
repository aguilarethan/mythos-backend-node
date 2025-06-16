import { Types } from 'mongoose';
import { IGenre } from './genre.interface';
import { IImageData } from './image-data.interface';

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
    isPublic: boolean;
    coverImage?: IImageData;
    bannerImage?: IImageData;
    status: NovelStatus;
    createdAt?: Date;
    updatedAt?: Date;
}