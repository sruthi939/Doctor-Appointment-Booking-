import mongoose from "mongoose";
import dns from "dns";

try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) { }

const connectDB = async () => {
    const atlasUri = process.env.MONGODB_URL || process.env.MONGODB_URI;

    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(atlasUri, {
            dbName: 'Medicare',
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.warn("⚠️ MongoDB Atlas Notice:", error.message);
        console.log("Attempting local MongoDB connection fallback...");
        try {
            await mongoose.disconnect();
            await mongoose.connect('mongodb://127.0.0.1:27017/Medicare', {
                dbName: 'Medicare'
            });
            console.log("✅ Local Database Connected Successfully");
        } catch (localErr) {
            console.error("❌ Local Database Connection Notice:", localErr.message);
        }
    }
};

export default connectDB;