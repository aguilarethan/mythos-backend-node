import app from './app';
import { connectDB } from './config/db';
import { config } from './config/config';
import { startGrpcServer } from './grpc/core/grpc-server';

connectDB();

app.listen(config.expressPort, () => {
    console.log(`Servidor corriendo en el puerto ${config.expressPort}`);
});

startGrpcServer();