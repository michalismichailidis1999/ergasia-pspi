import React, { useState} from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import {changeFirstName, changeLastName, changeEmail, changePassword, changePhoto} from '../../actions/userActions'

const MyAccount = () => {
    const dispatch = useDispatch();    
    const {user, token} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.form);
   
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [photoURL, setPhotoURL] = useState(user.photoURL)
    const [file, setFile] = useState(null);

    const [editFirstName, setEditFirstName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPhoto, setEditPhoto] = useState(false);

    const [currentEditedValue, setCurrentEditedValue] = useState(null);

    const handlePasswordChange = (e) => {
        e.preventDefault();

        setCurrentEditedValue("password");

        dispatch(changePassword(user.id, token, password, newPassword));

        setPassword("")
        setNewPassword("")
    }

    const handleFileChange = (e) => {
        setPhotoURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    const updateUserPhoto = () => {
        const formData = new FormData();
        formData.set("file", file);

        dispatch(changePhoto(user.id, token, formData, photoURL));

        setEditPhoto(false);
    }

    return (
        <React.Fragment>
            <ul className="infos">
                <li className="border-bottom mb-2 pb-2">
                    <div className="d-flex align-items-center mb-3">
                        <img src={photoURL} alt="User Default" />
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                if(editPhoto){
                                    updateUserPhoto();
                                }else{
                                    setEditPhoto(true)
                                }
                            }}
                        >
                            {editPhoto ? "Update Photo" : "Change Photo"}
                        </button>
                    </div>

                    {
                        editPhoto &&
                        <div className="d-flex flex-column justify-content-center">
                            <input type="file" onChange={handleFileChange} className="form-control mb-2" />
                            <button className="btn btn-secondary" style={{width: "fit-content"}} onClick={() => {
                                setFile(null)
                                setEditPhoto(false);
                                setPhotoURL(user.photoURL);
                            }}>Cancel</button>
                        </div>
                    }
                </li>
                <li className="border-bottom mb-2 pb-2">
                    <label>First Name:</label>
                    {
                        !editFirstName ? 
                            <>
                                <div className="d-flex align-items-center">
                                    {firstName} {loading && currentEditedValue === "firstName" && <span className="spinner-border"></span>}
                                    <button className="change-button" onClick={() => {
                                        if(loading){
                                            return;
                                        }

                                        if(editLastName){
                                            setEditLastName(false);
                                        }

                                        if(editEmail){
                                            setEditEmail(false);
                                        }

                                        setCurrentEditedValue("firstName")
                                        setEditFirstName(true)
                                    }}>
                                        <i className="fas fa-pen"></i>
                                    </button>
                                </div>
                            </>

                        :
                            
                            <>
                                <div className="mb-2">
                                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-primary update-btn" onClick={() => {
                                        dispatch(changeFirstName(user.id, token, firstName));
                                        setEditFirstName(false);
                                    }}>
                                        Update
                                    </button>
                                    <button onClick={() => setEditFirstName(false)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </>
                    }
                </li>
                
                <li className="border-bottom mb-2 pb-2">
                    <label>Last Name:</label>
                    {
                        !editLastName ? 
                            <>
                                <div className="d-flex align-items-center">
                                    {lastName} {loading && currentEditedValue === "lastName" && <span className="spinner-border"></span>}
                                    <button className="change-button" onClick={() => {
                                        if(loading){
                                            return;
                                        }

                                        if(editFirstName){
                                            setEditFirstName(false);
                                        }

                                        if(editEmail){
                                            setEditEmail(false);
                                        }

                                        setCurrentEditedValue("lastName")
                                        setEditLastName(true)
                                    }}>
                                        <i className="fas fa-pen"></i>
                                    </button>
                                </div>
                            </>

                        :
                            
                            <>
                                <div className="mb-2">
                                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className="mb-2">
                                    <button disabled={loading} className="btn btn-primary update-btn" onClick={() => {
                                        dispatch(changeLastName(user.id, token, lastName))
                                        setEditLastName(false);
                                    }}>
                                        Update {loading && <div className="spinner-border"></div>}
                                    </button>
                                    <button onClick={() => setEditLastName(false)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </>
                    }
                </li>

                <li className="border-bottom mb-2 pb-2">
                    <label>Role:</label> {user.role}
                </li>

                <li className="border-bottom mb-2 pb-2">
                    <label>Email:</label> 
                    {!editEmail ? 
                        <>
                            <div className="d-flex align-items-center">
                                {email} {loading && currentEditedValue === "email" && <span className="spinner-border"></span>}
                                <button className="change-button" onClick={() => {
                                    if(loading){
                                        return;
                                    }

                                    if(editFirstName){
                                        setEditFirstName(false);
                                    }

                                    if(editLastName){
                                        setEditLastName(false);
                                    }

                                    setCurrentEditedValue("email")
                                    setEditEmail(true)
                                }}>
                                <i className="fas fa-pen"></i> </button>
                            </div>
                        </> 
                        
                        : 
                        <>
                            <div className="mb-2">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-2">
                                <button disabled={loading} className="btn btn-primary update-btn" onClick={() => {
                                    dispatch(changeEmail(user.id, token, email))
                                    setEditEmail(false);
                                }}>
                                    Update {loading && <div className="spinner-border"></div>}
                                </button>
                                <button onClick={() => setEditEmail(false)} className="btn btn-secondary">Cancel</button>
                            </div>
                        </>
                    }
                </li>

                <li>
                    Change Password: <i className="fas fa-lock"></i> 
                </li>
            </ul>
                    
            <form className="contact-form pass" onSubmit={handlePasswordChange}>
                <div>
                    <div>Old Password</div>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter your old password..."
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <div>New Password</div>
                
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter your new password..."
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary" 
                    disabled={(password === "" && newPassword === "") || loading}
                >
                    Change {loading && currentEditedValue === "password" && <div className="spinner-border"></div>}
                </button>
            </form>
        
        </React.Fragment>
    )
}

export default MyAccount
