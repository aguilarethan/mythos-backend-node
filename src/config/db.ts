import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mythosmdb');
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);
    }
};