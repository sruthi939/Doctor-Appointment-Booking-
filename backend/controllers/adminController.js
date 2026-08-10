import validator from 'validator'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import accountantModel from '../models/accountantModel.js'
import receptionistModel from '../models/receptionistModel.js'
import jwt from 'jsonwebtoken'

const defaultDoctorsSeed = [
    {
        name: 'Dr. Richard James',
        email: 'richard.james@medicare.com',
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc1.png',
        available: true
    },
    {
        name: 'Dr. Emily Larson',
        email: 'emily.larson@medicare.com',
        speciality: 'Gynecology',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Specialist in women\'s reproductive health, prenatal care, and gynecological surgeries with compassionate patient support.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc2.png',
        available: true
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'sarah.patel@medicare.com',
        speciality: 'Dermatology',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Expert in skin care, cosmetic dermatology, acne treatment, and advanced laser dermatological procedures.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc3.png',
        available: true
    },
    {
        name: 'Dr. Christopher Lee',
        email: 'christopher.lee@medicare.com',
        speciality: 'Pediatrics',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dedicated pediatric specialist providing comprehensive healthcare, vaccinations, and growth monitoring for infants and children.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc4.png',
        available: true
    },
    {
        name: 'Dr. Jennifer Garcia',
        email: 'jennifer.garcia@medicare.com',
        speciality: 'Neurology',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Expert neurologist specializing in brain disorders, stroke prevention, epilepsy management, and nerve care.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc5.png',
        available: true
    },
    {
        name: 'Dr. Andrew Williams',
        email: 'andrew.williams@medicare.com',
        speciality: 'Cardiology',
        degree: 'MBBS, MD Cardiology',
        experience: '6 Years',
        about: 'Interventional cardiologist specializing in heart disease prevention, ECG analysis, and hypertension management.',
        fees: 75,
        address: { line1: '67th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc6.png',
        available: true
    },
    {
        name: 'Dr. Christopher Davis',
        email: 'christopher.davis@medicare.com',
        speciality: 'Orthopedics',
        degree: 'MBBS, MS Ortho',
        experience: '5 Years',
        about: 'Orthopedic specialist treating joint pain, bone fractures, sports injuries, and spine conditions.',
        fees: 65,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc7.png',
        available: true
    },
    {
        name: 'Dr. Timothy White',
        email: 'timothy.white@medicare.com',
        speciality: 'ENT',
        degree: 'MBBS, MS ENT',
        experience: '4 Years',
        about: 'Ear, Nose, and Throat surgeon specializing in sinus care, hearing assessment, and throat disorder treatments.',
        fees: 55,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc8.png',
        available: true
    },
    {
        name: 'Dr. Ava Mitchell',
        email: 'ava.mitchell@medicare.com',
        speciality: 'Ophthalmology',
        degree: 'MBBS, DO',
        experience: '3 Years',
        about: 'Eye specialist providing vision correction, cataract care, glaucoma screening, and laser eye treatment.',
        fees: 45,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc9.png',
        available: true
    },
    {
        name: 'Dr. Jeffrey King',
        email: 'jeffrey.king@medicare.com',
        speciality: 'Dentistry',
        degree: 'BDS, MDS',
        experience: '5 Years',
        about: 'Experienced dental surgeon offering root canal treatments, teeth whitening, cosmetic dentistry, and dental implants.',
        fees: 50,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc10.png',
        available: true
    },
    {
        name: 'Dr. Zoe Kelly',
        email: 'zoe.kelly@medicare.com',
        speciality: 'Pulmonology',
        degree: 'MBBS, MD Respiratory',
        experience: '4 Years',
        about: 'Pulmonologist focusing on asthma, bronchitis, allergy management, and respiratory health.',
        fees: 60,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc11.png',
        available: true
    },
    {
        name: 'Dr. Patrick Harris',
        email: 'patrick.harris@medicare.com',
        speciality: 'Urology',
        degree: 'MBBS, MCh Urology',
        experience: '7 Years',
        about: 'Urologist specializing in kidney stone management, prostate care, and urinary tract treatments.',
        fees: 70,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc12.png',
        available: true
    },
    {
        name: 'Dr. Chloe Evans',
        email: 'chloe.evans@medicare.com',
        speciality: 'Oncology',
        degree: 'MBBS, MD Oncology',
        experience: '8 Years',
        about: 'Medical oncologist providing cancer screening, targeted therapies, and personalized chemotherapy treatment plans.',
        fees: 85,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc13.png',
        available: true
    },
    {
        name: 'Dr. Ryan Martinez',
        email: 'ryan.martinez@medicare.com',
        speciality: 'Gynecology',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Gynecological health consultant providing maternal care and wellness checkups.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc14.png',
        available: true
    },
    {
        name: 'Dr. Amelia Hill',
        email: 'amelia.hill@medicare.com',
        speciality: 'Dermatology',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dermatology expert specializing in skin rejuvenation and anti-aging treatments.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' },
        image: 'doc15.png',
        available: true
    }
];

const ensureDoctorsInDatabase = async () => {
    try {
        const count = await doctorModel.countDocuments({});
        if (count < 15) {
            await doctorModel.deleteMany({});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('doctor@12345', salt);
            const docsToInsert = defaultDoctorsSeed.map(doc => ({
                ...doc,
                password: hashedPassword,
                date: Date.now()
            }));
            await doctorModel.insertMany(docsToInsert);
            console.log('✅ Successfully seeded all 15 doctors into MongoDB.');
        }
    } catch (e) {
        console.error('Error seeding doctors:', e.message);
    }
};

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing Details"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        let imageUrl = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            })
            imageUrl = imageUpload.secure_url
        }

        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address: parsedAddress,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({
            success: true,
            message: "Doctor Added Successfully"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321')
            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API to get all appointments list for admin
const appointmentsAdmin = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, appointments: [] })
        }
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: true, appointments: [], message: error.message })
    }
}

// API for appointment cancellation by admin
const appointmentCancelAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment Not Found" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        if (doctorData) {
            let slots_booked = doctorData.slots_booked || {}
            if (slots_booked[slotDate]) {
                slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            }
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        }

        res.json({ success: true, message: "Appointment Cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({
                success: true,
                dashData: { doctors: 15, appointments: 0, patients: 0, accountants: 0, receptionists: 0, latestAppointments: [] }
            })
        }
        await ensureDoctorsInDatabase();
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        const accountants = await accountantModel.find({})
        const receptionists = await receptionistModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            accountants: accountants.length,
            receptionists: receptionists.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, doctors: defaultDoctorsSeed })
        }
        await ensureDoctorsInDatabase();
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors: doctors.length > 0 ? doctors : defaultDoctorsSeed })
    } catch (error) {
        console.log(error)
        res.json({ success: true, doctors: defaultDoctorsSeed, message: error.message })
    }
}

// API to change doctor availability for admin panel
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        if (docData) {
            await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        }
        res.json({ success: true, message: 'Availability Changed' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all accountants
const allAccountants = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, accountants: [] })
        }
        const accountants = await accountantModel.find({}).select('-password')
        res.json({ success: true, accountants })
    } catch (error) {
        console.log(error)
        res.json({ success: true, accountants: [], message: error.message })
    }
}

// API to add accountant
const addAccountant = async (req, res) => {
    try {
        const { name, email, password, phone, department } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const exists = await accountantModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Accountant already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newAccountant = new accountantModel({
            name,
            email,
            password: hashedPassword,
            phone: phone || '+1 987 654 3210',
            department: department || 'Finance'
        })
        await newAccountant.save()

        res.json({ success: true, message: "Accountant Added Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all receptionists
const allReceptionists = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, receptionists: [] })
        }
        const receptionists = await receptionistModel.find({}).select('-password')
        res.json({ success: true, receptionists })
    } catch (error) {
        console.log(error)
        res.json({ success: true, receptionists: [], message: error.message })
    }
}

// API to add receptionist
const addReceptionist = async (req, res) => {
    try {
        const { name, email, password, phone, shift } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const exists = await receptionistModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Receptionist already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newReceptionist = new receptionistModel({
            name,
            email,
            password: hashedPassword,
            phone: phone || '+1 987 654 3210',
            shift: shift || 'Morning (08:00 AM - 04:00 PM)'
        })
        await newReceptionist.save()

        res.json({ success: true, message: "Receptionist Added Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    addDoctor,
    loginAdmin,
    appointmentsAdmin,
    appointmentCancelAdmin,
    adminDashboard,
    allDoctors,
    changeAvailability,
    allAccountants,
    addAccountant,
    allReceptionists,
    addReceptionist
}