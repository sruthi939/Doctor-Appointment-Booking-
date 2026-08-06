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
        },
        workingDays: {
            type: [String],
            default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        timeSlots: {
            type: [String],
            default: [
                '09:00 AM - 10:00 AM',
                '10:00 AM - 11:00 AM',
                '11:00 AM - 12:00 PM',
                '02:00 PM - 03:00 PM',
                '03:00 PM - 04:00 PM'
            ]
        }
    },
    { timestamps: true }
);

// Match password method
doctorSchema.methods.matchPassword = async function (enteredPassword) {
    if (this.password === enteredPassword) return true;
    try {
        const bcrypt = await import('bcryptjs');
        return await bcrypt.default.compare(enteredPassword, this.password);
    } catch (e) {
        return this.password === enteredPassword;
    }
};

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;

