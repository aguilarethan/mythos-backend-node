import app from './app';
import { connectDB } from './config/db';

connectDB();

app.listen(3000);
console.log('Servidor corriendo en el puerto', 3000);