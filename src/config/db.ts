import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);
        process.exit(1); 
    }
};