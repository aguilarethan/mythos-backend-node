import { Schema, model, Document } from 'mongoose';
import { INovelReport, ReportStatus } from '../interfaces/novel-report.interface';

export type NovelReportDocument = INovelReport & Document;

const novelReportSchema = new Schema<NovelReportDocument>({
    novelId: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    reporterAccountId: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(ReportStatus), default: ReportStatus.PENDING, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
            delete ret._id;
            delete ret.__v;
        }
    }
});

novelReportSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const NovelReportModel = model<NovelReportDocument>('NovelReport', novelReportSchema);