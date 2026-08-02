import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* ------------ Left Section ----------- */}
                <div className=''>
                    <img
                        className='mb-5 w-40'
                        src={assets.logo}
                        alt=''
                    />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        The Doctor Appointment Booking System is a web application that enables patients to book appointments with doctors online.
                        It allows users to register, search doctors by specialty, choose available time slots, manage appointments, receive notifications,
                        and helps doctors efficiently organize patient schedules and records.
                    </p>
                </div>

                {/* ------------ Center Section ----------*/}
                <div className=''>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* ------------ Right Section ------------*/}
                <div className=''>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>0471-8236547</li>
                        <li>doctorappointment@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* --------------- Copyright Text ------------ */}
            <div className=''>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2026@ Doctor Appointement Booking System. All Right Reversed
                </p>
            </div>
        </div>
    )
}

export default Footer