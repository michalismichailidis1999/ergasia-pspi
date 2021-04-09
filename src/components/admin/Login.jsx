import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setIsInAdminArea } from '../../actions/adminActions';
import { login } from '../../actions/userActions';
import './style.css'

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {user, isAuthenticated} = useSelector(state => state.user)
    const {loading} = useSelector(state => state.form)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(login(email, password, true));
    }

    useEffect(() => {
        dispatch(setIsInAdminArea(true))

        if(isAuthenticated && user.role === "admin"){
            history.push("/admin");
        }
    }, [])

    useEffect(() => {
        if(isAuthenticated && user.role === "admin"){
            history.push("/admin");
        }
    }, [isAuthenticated])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center admin-login">
            <form onSubmit={handleSubmit}>
                <h1>Admin Login <i className="fas fa-user-shield"></i></h1>

                <div className="my-3">
                    <label className="form-label">Email</label>
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

                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={email === "" || password === ""}
                >
                    Submit {loading && <div className="spinner-border"></div>}
                </button>
            </form>

            <Link to="/" className="link">
                <i className="fas fa-long-arrow-alt-left"></i> Go Back
            </Link>
        </div>
    )
}

export default Login
