import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';

dotenv.config();
await connectDB();

const doctors = [
    {
        name: 'Dr. Richard James',
        email: 'richard@medicare.com',
        password: 'password123',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        rating: 4.8,
        reviewsCount: 124,
        available: true
    },
    {
        name: 'Dr. Emily Larson',
        email: 'emily@medicare.com',
        password: 'password123',
        image: 'https://images.unsplash.com/photo-1594824813566-88855ce78968?auto=format&fit=crop&q=80&w=600',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Larson is dedicated to women health wellness, maternal care, and specialized gynecological surgeries.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        rating: 4.9,
        reviewsCount: 98,
        available: true
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'sarah@medicare.com',
        password: 'password123',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Patel specializes in clinical dermatology, skin rejuvenation, allergic treatments, and cosmetic therapy.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        rating: 4.7,
        reviewsCount: 142,
        available: true
    },
    {
        name: 'Dr. Christopher Lee',
        email: 'chris@medicare.com',
        password: 'password123',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Lee is passionate about child healthcare, growth monitoring, immunizations, and pediatric wellness.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        rating: 4.9,
        reviewsCount: 88,
        available: true
    },
    {
        name: 'Dr. Jennifer Garcia',
        email: 'jennifer@medicare.com',
        password: 'password123',
        image: 'https://images.unsplash.com/photo-1594824813566-88855ce78968?auto=format&fit=crop&q=80&w=600',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Garcia provides expert evaluation and therapies for migraine, neuro-disorders, and brain health.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        rating: 4.8,
        reviewsCount: 110,
        available: true
    }
];

const seedData = async () => {
    try {
        await Doctor.deleteMany({});
        await User.deleteMany({});
        await Appointment.deleteMany({});

        const createdDoctors = await Doctor.insertMany(doctors);

        const sampleUser = await User.create({
            name: 'John Smith',
            email: 'johnsmith@example.com',
            password: 'password123',
            phone: '+1 987 654 3210',
            address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
            gender: 'Male',
            dob: '1995-07-20'
        });

        await Appointment.create({
            userId: sampleUser._id,
            docId: createdDoctors[0]._id,
            doctorData: createdDoctors[0],
            slotDate: '15 May 2026',
            slotTime: '11:00 AM',
            amount: 50,
            status: 'Upcoming',
            paymentStatus: 'Paid',
            paymentMethod: 'Credit / Debit Card',
            patientDetails: {
                fullName: 'John Smith',
                email: 'johnsmith@example.com',
                phone: '+1 987 654 3210',
                reason: 'Fever and headache'
            }
        });

        console.log('[Seed Success] Database seeded with Doctors, Patient User, and Appointments!');
        process.exit(0);
    } catch (error) {
        console.error('[Seed Error]', error.message);
        process.exit(1);
    }
};

seedData();
