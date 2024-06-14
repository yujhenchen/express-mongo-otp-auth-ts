import { connect } from 'mongoose';

export default async function connectToDatabase() {
    const dbConnString = process.env.DB_CONN_STRING || '';
    try {
        await connect(dbConnString);
        console.log('Successfully connected to db');
    } catch (error) {
        console.error(error);
    }
}
