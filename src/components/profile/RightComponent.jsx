import React, {useEffect, useState} from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';



const RightComponent = () => {
    const {isAuthenticated, user} = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleSubmits = (e) => {
        setTitle(e.target.value);
    }
    return (
       
            <div className="rightComponent">
                <div className="rightComponent-box">
                <ul className="infos">
                    <li>
                    Name: {user.firstName + " " + user.lastName} <button className="change-button" onClick="console.log('Clicked')">
                        <i className="fas fa-pen"></i> </button> 
                    </li>
                    
                    <li>
                    Email: {user.email} <button className="change-button" onClick="console.log('Clicked')">
                        <i className="fas fa-pen"></i> </button>
                    </li>

                    <li>
                    Change Password: 
                        <i className="fas fa-lock"></i> 
                    </li>


                </ul>
                    
        <form className="contact-form pass">
            <div>
                <div>Old password</div>
                <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter your old password..."
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    
                    />
            </div>

            <div>
                <div>New password</div>
               
                <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter your new password..."
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)}
                    />
            </div>

            <button>Change</button>
        </form>
        



                </div>
            </div>
        
    )
}

export default RightComponent