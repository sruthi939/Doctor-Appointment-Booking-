# 🩺 Medicare — Doctor Appointment & Hospital Management System

A comprehensive, full-stack hospital management web application designed for seamless online medical appointment booking, patient queue tracking, doctor schedule organization, receptionist walk-in management, accountant financial operations, and system administration.

---

## 🌟 Key Highlights & Modules

### 1. 👤 Patient Portal (`frontend`)
* **Doctor Search & Discovery**: Browse and filter doctors by medical specialties (*General Physician, Gynecology, Dermatology, Pediatrics, Neurology, Cardiology, Orthopedics, ENT, Ophthalmology, Dentistry, Pulmonology, Urology, Oncology*).
* **Online Slot Booking**: Select available appointment dates and 30-minute time slots.
* **My Appointments**: Track booking status (*Upcoming, Completed, Cancelled*), view consultation fees, and cancel appointments.
* **User Profile**: Update profile picture, contact phone number, address, gender, and date of birth.

---

### 2. 👨‍⚕️ Doctor Portal (`frontend` & `admin`)
* **Consultations Dashboard**: Real-time stats on total earnings ($), completed consultations, assigned patient counts, and recent bookings.
* **Appointment Management**: One-click action buttons to mark appointments as **Completed** or **Cancelled**.
* **Doctor Profile & Availability**: Manage consultation fees, degrees, experience, and toggle online booking availability (`Active` / `Offline`).

---

### 3. 💳 Accountant Portal (`frontend` & `admin`)
* **Financial Overview**: Real-time revenue tracking, total transactions, registered patient counts, and pending refunds.
* **Billing & Transactions**: Full database records of all patient appointment payment transactions.
* **Invoices & Refund Processing**: Process patient refund requests with real-time database status updates.
* **Admin Payment Access Control**: Administrators can lock or grant payment processing permissions for accountants.

---

### 4. 📋 Receptionist Desk (`frontend` & `admin`)
* **Walk-In Appointment Booking**: Register walk-in or phone patients with strict **10-digit mobile number validation** (no country code prefix).
* **Specialty & Doctor Selector**: Medical specialty dropdown filter automatically updating available doctors and consultation fees.
* **Queue Management**: Real-time waiting list queue with **Mark Checked-In** workflow to track patient arrivals.
* **Patient Directory**: Search registered patients by name, email, or phone number.

---

### 5. 🛡️ System Admin Panel (`admin`)
* **Registered Doctors Table**: Full table view of all 15 medical specialists with official PNG photo assets, specialty badges, consultation fees, and availability switches.
* **Doctor Detail Modal**: Click any doctor row to view full medical credentials, degree, clinic address, and biography.
* **Add Doctor Workflow**: Add new doctors with photo upload, qualifications, and automatic redirection to the Doctors Table upon submission.
* **Staff Account Creation**: Modal popups to create valid email and password login accounts for Accountants and Receptionists.
* **Staff Work Portals Access**: Direct internal access views inside the Admin Panel to inspect Doctor Work Portal, Accountant Payments Desk, and Receptionist Desk.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js 18, Vite, Tailwind CSS, Lucide React Icons, React Router v6, React Toastify, Axios |
| **Backend** | Node.js, Express.js, JWT (JSON Web Tokens), Bcrypt.js, Validator, Multer, Cloudinary |
| **Database** | MongoDB (Mongoose ORM) with automatic seeding for doctors & DNS SRV resolution |
| **Styling** | Modern white & royal blue theme (`#5F6FFF`), dark slate glassmorphism, responsive UI |

---

## 📁 Project Architecture

```
Doctor-Appointment-Booking/
├── backend/                  # Express.js REST API server
│   ├── config/               # MongoDB & Cloudinary configurations
│   ├── controllers/          # Admin, Doctor, Accountant, Receptionist & User controllers
│   ├── middleware/           # JWT Authentication middlewares (authAdmin, authDoctor, etc.)
│   ├── models/               # Mongoose schemas (doctorModel, userModel, appointmentModel, etc.)
│   ├── routes/               # Express API routes
│   └── server.js             # Entry point (Port 5000)
│
├── frontend/                 # Patient, Accountant & Receptionist web app
│   ├── src/
│   │   ├── assets/           # Real doctor PNG images (doc1.png to doc15.png) & logos
│   │   ├── components/       # Layouts, Navbars, Footers & Protected Routes
│   │   ├── context/          # React AppContext
│   │   ├── pages/            # Patient, Accountant & Receptionist pages
│   │   ├── routes/           # Role-based route configurations
│   │   └── services/         # Axios API service calls
│   └── vite.config.js        # Vite config (Port 5173)
│
└── admin/                    # System Admin Panel web app
    ├── src/
    │   ├── components/       # Admin Sidebar, Navbar, Login
    │   ├── context/          # AdminContext & DoctorContext
    │   └── pages/            # Admin Dashboard, Doctors Table, Add Doctor, Staff Lists
    └── vite.config.js        # Vite config (Port 5174)
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: Atlas or local MongoDB instance

---

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```
> The backend server runs on `http://localhost:5000`.

---

### 3. Frontend Setup (Patient, Accountant & Receptionist Portal)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
> The frontend web app runs on `http://localhost:5173`.

---

### 4. Admin Panel Setup
```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Start admin development server
npm run dev
```
> The admin panel runs on `http://localhost:5174`.

---

## 🔐 Environment Variables (`backend/.env`)

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
JWT_SECRET=medicare_secret_key_super_secure_987654321
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin@2805
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
``` 

👩‍💻 Developed By
Sruthi Alex

---

## 📄 License
This project is open-source under the MIT License.
