import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppConext } from '../context/AppContext'

const Doctors = () => {

    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);

    const [doctors] = useContext(AppConext);

    return (
        <div>
            <p>Browser through the doctors specialist.</p>
            <div>
                <div>
                    <p>Cardiologist</p>
                    <p>Neurologist</p>
                    <p>Orthopedics</p>
                    <p>Pediatristion</p>
                    <p>Dermatologist</p>
                    <p>Gynecologist</p>
                    <p>ENT</p>
                    <p>Ophthalmologist</p>
                    <p>Dentist</p>
                    <p>Pulmonologist</p>
                    <p>Urologist</p>
                    <p>Oncologist</p>
                    <p>General Physician</p>
                </div>
            </div>
        </div>
    )
}

export default Doctors