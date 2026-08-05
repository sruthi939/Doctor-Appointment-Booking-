import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor-appointment-booking');
        console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database Error] ${error.message}`);
        // Do not hard-exit so server can run in fallback mode if DB is disconnected
    }
};

export default connectDB;
