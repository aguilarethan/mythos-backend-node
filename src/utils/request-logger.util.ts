import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/request.log'), { flags: 'a' });

const requestLogger = morgan('combined', { stream: accessLogStream });

export default requestLogger;
