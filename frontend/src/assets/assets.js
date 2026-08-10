import logo from './logo.png'
import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Cardiology from './Cardiology.png'
import Neurology from './Neurology.png'
import Orthopedics from './Orthopedics.png'
import Pediatrics from './Pediatrics.png'
import Dermatology from './Dermatology.png'
import Gynecology from './Gynecology.png'
import ENT from './ENT.png'
import Ophthalmology from './Ophthalmology.png'
import Dentistry from './Dentistry.png'
import Pulmonology from './Pulmonology.png'
import Urology from './Urology.png'
import Oncology from './Oncology.png'
import General_physician from './General_Physician.png'

export const assets = {
    logo,
    appointment_img,
    header_img,
    profile_pic,
    contact_image,
    about_image,
}

export const specialityData = [
    {
        speciality: 'General Physician',
        image: General_physician,
    },
    {
        speciality: 'Cardiology',
        image: Cardiology,
    },
    {
        speciality: 'Neurology',
        image: Neurology,
    },
    {
        speciality: 'Orthopedics',
        image: Orthopedics,
    },
    {
        speciality: 'Pediatrics',
        image: Pediatrics,
    },
    {
        speciality: 'Dermatology',
        image: Dermatology,
    },
    {
        speciality: 'Gynecology',
        image: Gynecology,
    },
    {
        speciality: 'ENT',
        image: ENT,
    },
    {
        speciality: 'Ophthalmology',
        image: Ophthalmology,
    },
    {
        speciality: 'Dentistry',
        image: Dentistry,
    },
    {
        speciality: 'Pulmonology',
        image: Pulmonology,
    },
    {
        speciality: 'Urology',
        image: Urology,
    },
    {
        speciality: 'Oncology',
        image: Oncology,
    },
];

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Gynecology',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Specialist in women\'s reproductive health, prenatal care, and gynecological surgeries with compassionate patient support.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatology',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Expert in skin care, cosmetic dermatology, acne treatment, and advanced laser dermatological procedures.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatrics',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dedicated pediatric specialist providing comprehensive healthcare, vaccinations, and growth monitoring for infants and children.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Neurology',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Expert neurologist specializing in brain disorders, stroke prevention, epilepsy management, and nerve care.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Cardiology',
        degree: 'MBBS, MD Cardiology',
        experience: '6 Years',
        about: 'Interventional cardiologist specializing in heart disease prevention, ECG analysis, and hypertension management.',
        fees: 75,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'Orthopedics',
        degree: 'MBBS, MS Ortho',
        experience: '5 Years',
        about: 'Orthopedic specialist treating joint pain, bone fractures, sports injuries, and spine conditions.',
        fees: 65,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'ENT',
        degree: 'MBBS, MS ENT',
        experience: '4 Years',
        about: 'Ear, Nose, and Throat surgeon specializing in sinus care, hearing assessment, and throat disorder treatments.',
        fees: 55,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Ophthalmology',
        degree: 'MBBS, DO',
        experience: '3 Years',
        about: 'Eye specialist providing vision correction, cataract care, glaucoma screening, and laser eye treatment.',
        fees: 45,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Dentistry',
        degree: 'BDS, MDS',
        experience: '5 Years',
        about: 'Experienced dental surgeon offering root canal treatments, teeth whitening, cosmetic dentistry, and dental implants.',
        fees: 50,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Pulmonology',
        degree: 'MBBS, MD Respiratory',
        experience: '4 Years',
        about: 'Pulmonologist focusing on asthma, bronchitis, allergy management, and respiratory health.',
        fees: 60,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Urology',
        degree: 'MBBS, MCh Urology',
        experience: '7 Years',
        about: 'Urologist specializing in kidney stone management, prostate care, and urinary tract treatments.',
        fees: 70,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'Oncology',
        degree: 'MBBS, MD Oncology',
        experience: '8 Years',
        about: 'Medical oncologist providing cancer screening, targeted therapies, and personalized chemotherapy treatment plans.',
        fees: 85,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Gynecology',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Gynecological health consultant providing maternal care and wellness checkups.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Dermatology',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dermatology expert specializing in skin rejuvenation and anti-aging treatments.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]