import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            default: 'clinic_schedule',
            unique: true
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
                '03:00 PM - 04:00 PM',
                '04:00 PM - 05:00 PM'
            ]
        }
    },
    { timestamps: true }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
