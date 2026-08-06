import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, 'Expense category is required'],
            enum: ['Utilities', 'Equipment', 'Marketing', 'Stationery', 'Maintenance', 'Salaries', 'Other'],
            default: 'Utilities'
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        date: {
            type: String,
            default: () => new Date().toISOString().split('T')[0]
        },
        description: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
