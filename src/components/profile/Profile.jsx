import React from 'react'
import LeftComponent from './LeftComponent'
import RightComponent from './RightComponent'
import "./style.css"


const Profile = () => {
    return (
        <div className="layout">
            <div className="container profile-container">
                <LeftComponent/>

                <RightComponent/>
            </div>
            
        </div>
      
    )
}

export default Profile