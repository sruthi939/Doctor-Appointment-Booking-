import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        image: {
            type: String,
            required: true
        },
        speciality: {
            type: String,
            required: [true, 'Speciality is required']
        },
        degree: {
            type: String,
            default: 'MBBS'
        },
        experience: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true
        },
        fees: {
            type: Number,
            required: true
        },
        address: {
            line1: { type: String, required: true },
            line2: { type: String, required: true }
        },
        available: {
            type: Boolean,
            default: true
        },
        rating: {
            type: Number,
            default: 4.9
        },
        reviewsCount: {
            type: Number,
            default: 120
        },
        slots_booked: {
            type: Object,
            default: {}
        }
    },
    { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
