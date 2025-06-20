import { Types } from "mongoose";

export enum ReportStatus {
    PENDING = 'Pendiente',
    IN_PROGRESS = 'En progreso',
    RESOLVED = 'Resuelto',
    REJECTED = 'Rechazado'
}

export interface INovelReport {
    _id?: Types.ObjectId;
    novelId: Types.ObjectId;
    reporterAccountId: string;
    reason: string;
    description: string;
    status: ReportStatus;
    createdAt?: Date;
    updatedAt?: Date;
}