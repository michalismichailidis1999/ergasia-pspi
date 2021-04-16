import React from 'react'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import "./style.css"


const Profile = () => {
       return (
        <div className="layout profile">
            <LeftComponent/>

            <RightComponent/>
        </div>
    )
}

export default Profile