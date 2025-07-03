import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
    path: path.resolve(process.cwd(), envFile),
});

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
    expressPort: Number(process.env.EXPRESS_PORT),
    nextClientOrigin: process.env.NEXT_CLIENT_ORIGIN,
    dotnetClientOrigin: process.env.DOTNET_CLIENT_ORIGIN,
    environment: process.env.NODE_ENV || 'development',
};

