import React, { useState, useEffect } from 'react'
import {Link, useHistory } from 'react-router-dom'
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { toast } from 'react-toastify';

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading} = useSelector(state => state.form)
    const {isAuthenticated} = useSelector(state => state.user)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        dispatch(register(firstName, lastName, email, password))
    }

    useEffect(() => {
        if(isAuthenticated){
            history.push("/dashboard")
        }
    }, [isAuthenticated])

    return (
        <div className="my-form">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>

                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your first name..."
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Enter your last name..."
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control"
                        placeholder="Enter your email..."
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Enter your password..."
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        placeholder="Confirm your password..."
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <Link to="/login" className="redirect-link">Already have an account?</Link>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === ""}
                >
                    Submit {loading && <div className="spinner-border"></div>}
                </button>
            </form>
        </div>
    )
}

export default Register
