import express from 'express';
import morgan from 'morgan';

import chapterRoutes from './routes/chapter.routes';
import commentRoutes from './routes/comment.routes';
import genreRoutes from './routes/genre.routes';
import novelRoutes from './routes/novel.routes';
import readingHistoryRoutes from './routes/reading-history.routes';
import readingPreferencesSettingsRoutes from './routes/reading-preferences-settings.routes';
import reviewRoutes from './routes/review.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/chapter', chapterRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/novel', novelRoutes);
app.use('/api/reading-history', readingHistoryRoutes);
app.use('/api/reading-preferences-settings', readingPreferencesSettingsRoutes);
app.use('/api/review', reviewRoutes);

export default app;