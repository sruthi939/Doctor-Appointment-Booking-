import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className=''>
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>
                    ABOUT
                    <span className='text-gray-700 font-medium'>
                        US
                    </span>
                </p>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img
                    className='w-full md:max-w-[360px]'
                    src={assets.about_image}
                    alt=''
                />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                    <p>Welcome To Doctor Appointment Booking your trusted partner in managing your Healthcare needs Conveniently and Efficiently
                        At this booking system we understand the challenges individuals face when it comes to scheduling doctor appointment and managing
                        their health records.
                    </p>
                    <p>
                        This is commited to excellence in Healthcare technology. We continuosly strive to enhance our platform, integrating the last advancements to
                        imporve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, we are here to
                        support you in every step of the way.
                    </p>
                    <b className='text-gray-800'>OUR VISION</b>
                    <p>Our Vision is to create a seamless Healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making
                        it easier for you to access. The care you need, when you need it.
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default About