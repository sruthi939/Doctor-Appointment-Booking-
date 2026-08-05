import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6
        },
        role: {
            type: String,
            enum: ['USER', 'DOCTOR', 'ADMIN', 'RECEPTIONIST', 'ACCOUNTANT'],
            default: 'USER'
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
        },
        phone: {
            type: String,
            default: '+1 987 654 3210'
        },
        address: {
            line1: { type: String, default: '57th Cross, Richmond' },
            line2: { type: String, default: 'Circle, Ring Road, London' }
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other', 'Not Selected'],
            default: 'Male'
        },
        dob: {
            type: String,
            default: '1995-07-20'
        }
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
