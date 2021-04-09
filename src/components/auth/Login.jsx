import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {loading} = useSelector(state => state.form)
    const {isAuthenticated} = useSelector(state => state.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    useEffect(() => {
        if(isAuthenticated){
            history.push("/dashboard")
        }
    }, [isAuthenticated])
    
    return (
        <div className="my-form">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

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
                    <Link to="/register" className="redirect-link">Don't have an account?</Link>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={email === "" || password === ""}
                >
                    Submit {loading && <div className="spinner-border"></div>}
                </button>
            </form>
        </div>
    )
}

export default Login
