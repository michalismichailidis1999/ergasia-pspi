import React, { useState } from 'react'
import "./style.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorOccured, setErrorOcccured] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(username, email, password)
    }

    return (
        <div className="my-form layout">
            {errorOccured && <div className="bg-danger form-error">Error occured</div>}

            <form onSubmit={handleSubmit}>
                <h1>Register</h1>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register
