import { Schema, model, Types, Document } from 'mongoose';
import { IVolume } from '../interfaces/volume.interface';

export type VolumeDocument = IVolume & Document;

const volumeSchema = new Schema<VolumeDocument>({
    novelId: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    volumeNumber: { type: Number, min: 1, required: true },
    title: { type: String, trim: true, required: true },
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

volumeSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export const VolumeModel = model<VolumeDocument>('Volume', volumeSchema);