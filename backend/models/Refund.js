import mongoose from 'mongoose';

const refundSchema = new mongoose.Schema(
    {
        refundId: {
            type: String,
            required: true,
            unique: true
        },
        patientName: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['Requested', 'Processed', 'Rejected'],
            default: 'Requested'
        },
        date: {
            type: String,
            default: () => new Date().toISOString().split('T')[0]
        },
        reason: {
            type: String,
            default: 'Appointment Cancelled'
        }
    },
    { timestamps: true }
);

const Refund = mongoose.model('Refund', refundSchema);
export default Refund;
