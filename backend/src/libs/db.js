import mongoose from 'mongoose';
import env from './env.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.DB_URL);
        console.log(`✅Connected to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌Error connecting to MongoDB ${error}`)
        process.exit(1); // 0: Success. 1: Failiure
    }
}