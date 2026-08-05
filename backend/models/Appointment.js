import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        docId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        doctorData: {
            type: Object,
            required: true
        },
        slotDate: {
            type: String,
            required: true
        },
        slotTime: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['Upcoming', 'Completed', 'Cancelled'],
            default: 'Upcoming'
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid'],
            default: 'Paid'
        },
        paymentMethod: {
            type: String,
            default: 'Credit / Debit Card'
        },
        patientDetails: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            reason: { type: String, default: 'General Consultation' }
        },
        reviewSubmitted: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            default: 5
        },
        reviewText: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
