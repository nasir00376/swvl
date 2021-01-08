import Debug from 'debug';
import { connect } from 'mongoose';

let dbURL: string = process.env.DB_URL || '';

const debug: Debug.IDebugger = Debug('notification:db');

export async function connectDB(): Promise<void> {
    await connect(dbURL, { useNewUrlParser: true });
    debug('Database connected successfully');
}