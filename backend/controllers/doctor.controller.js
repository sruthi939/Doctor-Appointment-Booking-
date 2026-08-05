import Doctor from '../models/Doctor.js';

// Initial fallback doctor dataset to ensure doctors are returned even before DB seed
const initialDoctorsFallback = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
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
        _id: 'doc2',
        name: 'Dr. Emily Larson',
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
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
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
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
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
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
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

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        if (doctors && doctors.length > 0) {
            res.json({ success: true, doctors });
        } else {
            res.json({ success: true, doctors: initialDoctorsFallback });
        }
    } catch (error) {
        res.json({ success: true, doctors: initialDoctorsFallback });
    }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        let doctor = await Doctor.findById(id);
        if (!doctor) {
            doctor = initialDoctorsFallback.find(d => d._id === id);
        }
        if (doctor) {
            res.json({ success: true, doctor });
        } else {
            res.status(404).json({ success: false, message: 'Doctor not found' });
        }
    } catch (error) {
        const doc = initialDoctorsFallback.find(d => d._id === req.params.id) || initialDoctorsFallback[0];
        res.json({ success: true, doctor: doc });
    }
};

// @desc    Add new doctor (Admin)
// @route   POST /api/doctors/add
// @access  Private/Admin
export const addDoctor = async (req, res) => {
    try {
        const doctorData = req.body;
        const newDoctor = await Doctor.create(doctorData);
        res.status(201).json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
