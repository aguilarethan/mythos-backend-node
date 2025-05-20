import { Schema , model, Types, Document } from 'mongoose';
import { IGenre } from '../interfaces/genre.interface';

export type GenreDocument = IGenre & Document;

const genreSchema = new Schema<GenreDocument>({
    name: { type: String, required: true },
});

genreSchema.virtual('íd').get(function() {
    return this._id.toHexString();
});

genreSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    }
});

export const GenreModel = model<GenreDocument>('Genre', genreSchema);