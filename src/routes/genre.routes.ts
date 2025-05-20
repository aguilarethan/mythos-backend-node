import { Router } from 'express';
import {
    getAllGenres,
    createGenre,
    updateGenreById,
    deleteGenreById
} from '../controllers/genre.controller';

const router = Router();

router.get('/search/', getAllGenres);
router.post('/', createGenre);
router.put('/:id', updateGenreById);
router.delete('/:id', deleteGenreById);

export default router;
