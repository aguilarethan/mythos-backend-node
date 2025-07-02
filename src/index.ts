import app from './app';
import { connectDB } from './config/db';
import { config } from './config/config';
import { startGrpcServer } from './grpc/core/grpc-server';

connectDB();

app.listen(config.expressPort, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${config.expressPort}`);
});

startGrpcServer();