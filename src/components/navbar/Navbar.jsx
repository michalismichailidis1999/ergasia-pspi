import React from 'react'
import {NavLink} from 'react-router-dom'
import Sidenav from './Sidenav'
import "./style.css"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid max-width-container">

                <NavLink className="navbar-brand" to="/">ErgasiaPSPI</NavLink>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    </ul>
                </div>

                <Sidenav/>
            </div>
        </nav>
    )
}

export default Navbar;
