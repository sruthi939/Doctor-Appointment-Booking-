import mongoose from "mongoose";
import dns from "dns";

// Fix Node 24 Windows DNS SRV lookup for MongoDB Atlas
try {
    dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Medicare';
        await mongoose.connect(uri, {
            dbName: 'Medicare'
        });
        console.log("Data Base is Connected");
    } catch (error) {
        console.log("[MongoDB Notice]", error.message);
    }
};

export default connectDB;