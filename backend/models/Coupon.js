import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Coupon code is required'],
            unique: true,
            uppercase: true
        },
        discountPercent: {
            type: Number,
            required: [true, 'Discount percentage is required'],
            min: 1,
            max: 100
        },
        expiryDate: {
            type: String,
            default: '2026-12-31'
        },
        usageCount: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Active', 'Expired', 'Disabled'],
            default: 'Active'
        }
    },
    { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
