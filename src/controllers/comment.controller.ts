import { Request, Response } from 'express';
import { CommentModel } from '../models/comment.model';

export const getCommentsByChapterId = async (req: Request, res: Response) => {
    const { chapterId } = req.params;

    try {
        const comments = await CommentModel.find({ chapterId });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

export const createComment = async (req: Request, res: Response) => {
    const { chapterId, accountId, message } = req.body;

    try {
        const newComment = new CommentModel({ chapterId, accountId, message });
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Error al crear el comentario' });
    }
};

export const deleteCommentById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedComment = await CommentModel.findByIdAndDelete(id);
        if (!deletedComment) {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error al eliminar el comentario' });
    }
};


