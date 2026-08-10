import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema({
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
        default: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
    },
    phone: {
        type: String,
        default: "0000000000"
    },
    address: {
        type: Object,
        default: { line1: '', line2: '' }
    },
    shift: {
        type: String,
        default: "Morning"
    }
}, { timestamps: true });

const receptionistModel = mongoose.models.receptionist || mongoose.model('receptionist', receptionistSchema);

export default receptionistModel;
