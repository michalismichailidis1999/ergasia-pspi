import React, { useState,useEffect} from 'react'
import "./style.css"
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

const MyAccount = () => {    
    const {user} = useSelector(state => state.user);
   
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [editState1, setNewEditState1] = useState(true);
    const [editState2, setNewEditState2] = useState(true);
    const [name, setName] = useState(user.firstName + " " + user.lastName);
    const [mail, setMail] = useState(user.email);
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function changeName(n){setName(n);var array=n.split(" "); user.firstName=array[0]; array.shift();user.lastName=array.join(" ");};
    function changeMail(k){setMail(k);user.email=k;};

    function changeEditState1(){setNewEditState1(!editState1)};
    function changeEditState2(){setNewEditState2(!editState2)};

    useEffect( () => {
        
    }, [editState1,editState2, mail,name]);

    function updateName(){changeName(name);}
    function updateMail(){ changeMail(mail)}
    return (
        <React.Fragment>
            <ul className="infos">
                    <li>
                    Name: {
                        editState1 ? 
                            <>{name}
                            <button className="change-button" onClick={changeEditState1}>
                             <i className="fas fa-pen"></i> </button></> 
                             :
                             
                           <>  <input type="text"  defaultValue={name} value={name} onChange={e => changeName(e.target.value)}
                              />
                              <button className="change-button" onClick={()=>{ changeEditState1();updateName();}}>
                        <i className="fas fa-check"></i> </button> </>
                     }
                    </li>

                    <li>
                    Role:  {user.role}
                    </li>

                    <li>
                    Email: {editState2 ? 
                    <>{mail}
                    <button className="change-button" onClick={changeEditState2}>
                        <i className="fas fa-pen"></i> </button></> 
                        
                        : 
                        <><input type="email" defaultValue={mail} value={mail}   onChange={s=>(re.test(s.target.value))? changeMail(s.target.value):
                            toast.error("Wrong email !")}    />
                        <button className="change-button" onClick={()=>{ changeEditState2();updateMail();}}>
                        <i className="fas fa-check"></i> </button></>
                        }
                   
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
        
        </React.Fragment>
    )
}

export default MyAccount
