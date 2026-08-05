import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [useData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: "",
        phone: "",
        address: {
            line1: "",
            line2: ""
        },
        gender: "",
        dob: ""
    })

    const [IsEdit, setIsEdit] = useState(true)

    return (
        <div>
            <img src={useData.image} alt='' />
            {
                IsEdit
                    ? <input
                        type='text'
                        value={setUserData.name}
                        onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    : <p>{setUserData.name}</p>
            }
            <hr />
            <div>
                <p>CONTACT INFORMATION</p>
                <div>

                </div>
            </div>
        </div>
    )
}

export default MyProfile