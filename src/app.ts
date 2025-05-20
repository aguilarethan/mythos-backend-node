import express from 'express';
import morgan from 'morgan';

import novelRoutes from './routes/novel.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/novel', novelRoutes);

export default app;