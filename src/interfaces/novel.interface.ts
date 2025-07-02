import { Types } from 'mongoose';

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
    writerName: string;
    title: string;
    description: string;
    genres: string[];
    tags: string[];
    views: number;
    isPublic: boolean;
    coverImageUrl: string;
    status: NovelStatus;
    createdAt?: Date;
    updatedAt?: Date;
}