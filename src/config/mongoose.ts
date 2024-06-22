import { connection, connect } from 'mongoose';
import config from './config';

export default async function connectToDatabase(dbConnString: string) {
    const serverSelectionTimeoutMS = 60000;

    try {
        connection.on('connecting', () => console.info('connecting'));
        connection.on('connected', () => console.info('connected'));
        connection.on('open', () => console.info('open'));
        connection.on('disconnected', () => console.info('disconnected'));
        connection.on('reconnected', () => console.info('reconnected'));
        connection.on('disconnecting', () => console.info('disconnecting'));
        connection.on('close', () => console.info('close'));

        connection.on('error', () => {
            console.error(`🛸 Failed to connect to database: ${dbConnString}`);
        });

        await connect(dbConnString, {
            serverSelectionTimeoutMS,
            dbName: config.dbName,
        });
        return '🟢 Successfully connected to database'
    }
    catch (error) {
        console.error(error);
        return `🛸 Failed to connect to database: ${JSON.stringify(error)}`;
    }
}
