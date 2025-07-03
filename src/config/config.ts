import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const baseEnvPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(baseEnvPath)) {
    dotenv.config({ path: baseEnvPath });
}

const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv !== 'production') {
    const envFilePath = path.resolve(process.cwd(), `.env.${nodeEnv}`);
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath, override: true });
    }
}

const requireEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not defined in the environment variables`);
    }
    return value;
};

export const config = {
    mongodbUri: requireEnvVar('MONGODB_URI'),
    jwtSecret: requireEnvVar('JWT_SECRET'),
    nextClientOrigin: requireEnvVar('NEXT_CLIENT_ORIGIN'),
    dotnetClientOrigin: requireEnvVar('DOTNET_CLIENT_ORIGIN'),
    expressPort: Number(process.env.EXPRESS_PORT),
    grpcPort: String(process.env.GRPC_PORT), 
    environment: process.env.NODE_ENV || 'development',
};

