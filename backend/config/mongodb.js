import mongoose from "mongoose";
import dns from "dns";

// Force IPv4 and public Google/Cloudflare DNS for MongoDB Atlas SRV resolution
try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGOOSE_URL || 'mongodb://127.0.0.1:27017/medicare';
        
        let connString = uri;
        if (!uri.includes('/Medicare') && !uri.includes('/medicare') && !uri.includes('appName=')) {
            const cleanUri = uri.endsWith('/') ? uri.slice(0, -1) : uri;
            connString = `${cleanUri}/Medicare`;
        }

        try {
            await mongoose.connect(connString, {
                serverSelectionTimeoutMS: 5000,
                family: 4
            });
        } catch (atlasErr) {
            console.log("[MongoDB Notice] Cloud Atlas connection failed (" + atlasErr.message + "), trying local MongoDB...");
            try {
                await mongoose.connect('mongodb://127.0.0.1:27017/medicare', { serverSelectionTimeoutMS: 3000 });
            } catch (localErr) {
                console.log("[MongoDB Notice] Operating in offline mode without persistent MongoDB connection");
            }
        }
    } catch (err) {
        console.log("[MongoDB Notice]", err.message);
    }
};

export default connectDB;