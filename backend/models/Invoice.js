import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
    {
        invoiceId: {
            type: String,
            required: true,
            unique: true
        },
        patientName: {
            type: String,
            required: [true, 'Patient name is required']
        },
        patientEmail: {
            type: String,
            default: ''
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['Paid', 'Unpaid', 'Pending', 'Cancelled'],
            default: 'Paid'
        },
        date: {
            type: String,
            default: () => new Date().toISOString().split('T')[0]
        },
        items: [
            {
                description: String,
                cost: Number
            }
        ]
    },
    { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
