import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            default: 'system_settings',
            unique: true
        },
        siteName: {
            type: String,
            default: 'MediCare'
        },
        adminEmail: {
            type: String,
            default: 'admin@medicare.com'
        },
        phoneNumber: {
            type: String,
            default: '+1 987 654 3210'
        },
        currency: {
            type: String,
            default: 'USD ($)'
        },
        smsEnabled: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
