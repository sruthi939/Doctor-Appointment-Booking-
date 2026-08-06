import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true
        },
        patientName: {
            type: String,
            required: true
        },
        doctorName: {
            type: String,
            default: 'Dr. General Doctor'
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['Card', 'Net Banking', 'UPI', 'Wallet', 'Cash'],
            default: 'Card'
        },
        status: {
            type: String,
            enum: ['Completed', 'Pending', 'Failed', 'Refunded'],
            default: 'Completed'
        },
        date: {
            type: String,
            default: () => new Date().toISOString().split('T')[0]
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
