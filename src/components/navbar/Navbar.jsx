import React from 'react'
import {NavLink} from 'react-router-dom'
import Sidenav from './Sidenav'
import "./style.css"
import { useSelector } from 'react-redux';
import { authenticatedLinks, links } from './links';

const Navbar = () => {
    const {isAuthenticated} = useSelector(state => state.user);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid max-width-container">

                <NavLink className="navbar-brand" to="/">ErgasiaPSPI</NavLink>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isAuthenticated && links.map(
                            link => <li key={link.id} className="nav-item">
                                <NavLink className="nav-link" to={link.to}>
                                    {link.to.charAt(1).toUpperCase() + link.to.slice(2)}
                                </NavLink>
                            </li>
                        )}

                        {isAuthenticated && authenticatedLinks.map(
                            link => <li key={link.id} className="nav-item">
                                <NavLink 
                                    className="nav-link" 
                                    to={link.to}
                                    onClick={() => {
                                        if(link.action){
                                            link.action();
                                        }
                                    }}
                                >
                                    {link.to !== "/" ? link.to.charAt(1).toUpperCase() + link.to.slice(2) : "Log Out"}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <Sidenav/>
            </div>
        </nav>
    )
}

export default Navbar;
