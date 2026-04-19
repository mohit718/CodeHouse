import mongoose from 'mongoose';
import env from './env.js';

export const connectDB = async () => {
    try {
        if(!env.DB_URL)
            throw new Error('DB_URL is not defined in environment variables');
        const conn = await mongoose.connect(env.DB_URL);
        console.log(`✅Connected to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌Error connecting to MongoDB ${error}`)
        process.exit(1); // 0: Success. 1: Failiure
    }
}