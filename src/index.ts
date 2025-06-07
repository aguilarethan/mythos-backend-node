import app from './app';
import { connectDB } from './config/db';
import { config } from './config/config';

connectDB();

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto ${config.expressPort}`);
});