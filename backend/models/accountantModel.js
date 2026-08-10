import mongoose from "mongoose";

const accountantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250"
    },
    phone: {
        type: String,
        default: "0000000000"
    },
    department: {
        type: String,
        default: "Finance & Accounts"
    }
}, { timestamps: true });

const accountantModel = mongoose.models.accountant || mongoose.model('accountant', accountantSchema);

export default accountantModel;
