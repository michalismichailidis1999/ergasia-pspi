import React from 'react'

const Register = () => {
    return (
        <div className="my-form">
            <form>
                <h1>Register</h1>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register
