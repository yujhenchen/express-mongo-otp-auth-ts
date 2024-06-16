import { connection, connect } from 'mongoose';

export default function connectToDatabase(dbConnString: string) {

    try {
        connection.on('connected', () => console.info('connected'));
        connection.on('open', () => console.info('open'));
        connection.on('disconnected', () => console.info('disconnected'));
        connection.on('reconnected', () => console.info('reconnected'));
        connection.on('disconnecting', () => console.info('disconnecting'));
        connection.on('close', () => console.info('close'));

        connection.on('error', () => {
            throw new Error(`Failed to connect to database: ${dbConnString}`)
        });

        connect(dbConnString);
    }
    catch (error) {
        console.error(error)
    }
}
