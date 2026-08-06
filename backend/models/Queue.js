import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true
        },
        patientPhone: {
            type: String,
            default: '+1 987 654 3210'
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        doctorName: {
            type: String,
            required: true
        },
        checkInTime: {
            type: String,
            default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        status: {
            type: String,
            enum: ['Waiting', 'Served', 'Cancelled'],
            default: 'Waiting'
        },
        waitingMinutes: {
            type: Number,
            default: 10
        }
    },
    { timestamps: true }
);

const Queue = mongoose.model('Queue', queueSchema);
export default Queue;
