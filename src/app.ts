import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './config/config';

import chapterRoutes from './routes/chapter.routes';
import commentRoutes from './routes/comment.routes'
import genreRoutes from './routes/genre.routes';
import novelReportRoutes from './routes/novel-report.routes';
import novelRoutes from './routes/novel.routes';
import readingHistoryRoutes from './routes/reading-history.routes';
import readingPreferencesSettingsRoutes from './routes/reading-preferences-settings.routes';
import reviewRoutes from './routes/review.routes';

import { errorHandler } from './middlewares/error-handler.middleware';
import requestLogger from './utils/request-logger.util';

const app = express();

app.use(morgan('dev'));
app.use(requestLogger);
app.use(cors({
    origin: config.nextClientOrigin,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/chapters', chapterRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/novel-reports', novelReportRoutes); 
app.use('/api/novels', novelRoutes);
app.use('/api/reading-historys', readingHistoryRoutes);
app.use('/api/reading-preferences-settings', readingPreferencesSettingsRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);


export default app;