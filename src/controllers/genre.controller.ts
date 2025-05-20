import { Request, Response } from 'express';
import { GenreModel } from '../models/genre.model';

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await GenreModel.find();
        res.json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener los géneros' });
    }
};

export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const newGenre = new GenreModel({ name });
        const savedGenre = await newGenre.save();
        res.json(savedGenre);
    } catch (error) {
        console.error('Error creating genre:', error);
        res.status(500).json({ message: 'Ocurrió un error al crear el género' });
    }
};

export const updateGenreById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedGenre = await GenreModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedGenre) {
            res.status(404).json({ message: 'Género no encontrado' });
        }

        res.json(updatedGenre);
    } catch (error) {
        console.error('Error updating genre:', error);
        res.status(500).json({ message: 'Ocurrió un error al actualizar el género' });
    }
};

export const deleteGenreById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedGenre = await GenreModel.findByIdAndDelete(id);
        if (!deletedGenre) {
            res.status(404).json({ message: 'Género no encontrado' });
        }

        res.json({ message: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).json({ message: 'Ocurrió un error al eliminar el género' });
    }
};
