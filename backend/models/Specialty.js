import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Specialty name is required'],
            unique: true
        },
        image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=250'
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active'
        }
    },
    { timestamps: true }
);

const Specialty = mongoose.model('Specialty', specialtySchema);
export default Specialty;
