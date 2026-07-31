import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div id='speciality'>
            <h1></h1>
            <p></p>
            <div>
                {specialityData.map((item) > (
                    <Link>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu