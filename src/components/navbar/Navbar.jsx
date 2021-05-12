import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Sidenav from './Sidenav'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedLinks, links } from './links';
import { logOut } from '../../actions/userActions';
import { setSelectedComponent } from '../../actions/layoutActions';
import { setCurrentCourse } from '../../actions/courseActions';

const Navbar = () => {

    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.user);

    const [showDropmenu, setShowDropmenu] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid max-width-container">

                <Link className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/"}>ErgasiaPSPI</Link>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isAuthenticated && links.map(
                            link => <li key={link.id} className="nav-item">
                                <Link className="nav-link" to={link.to}>
                                    {link.to !== "/" ? link.to.charAt(1).toUpperCase() + link.to.slice(2) : "Home"}
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && authenticatedLinks.map(
                            link => <li key={link.id} className={ link.to !== "profile" ? "nav-item" : "nav-item dropmenu"}>
                                {
                                    link.to !== "/profile" && 
                                        <Link 
                                            className="nav-link" 
                                            to={link.to}
                                        >
                                            {link.to !== "/dashboard" ? link.to.charAt(1).toUpperCase() + link.to.slice(2) : "Home"}
                                        </Link>
                                }

                                {
                                    link.to === "/profile" && 
                                    <React.Fragment>
                                        <span className="dropdown-toggle" onClick={() => setShowDropmenu(!showDropmenu)}>
                                            <img src={user.photoURL} alt="User"/> <span>{user.firstName + " " + user.lastName}</span>
                                        </span>

                                        <ul className={showDropmenu ? "dropdown-menu show" : "dropdown-menu"}>
                                            {
                                                user.role !== "admin" &&
                                                <li>
                                                    <Link to="/profile" className="dropdown-item" onClick={() => {
                                                        dispatch(setSelectedComponent("courses"));
                                                        setShowDropmenu(false)
                                                    }}>
                                                        My Courses <i className="fas fa-book"></i>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                user.role === "teacher" &&
                                                <li>
                                                    <Link 
                                                        className="dropdown-item" 
                                                        to="/profile" 
                                                        onClick={() => {
                                                            setShowDropmenu(false)
                                                            dispatch(setCurrentCourse(null))
                                                            dispatch(setSelectedComponent("course-form"));
                                                        }}
                                                    >
                                                        Create Course <i className="fas fa-folder-plus"></i>
                                                    </Link>
                                                </li>
                                            }

                                            {   
                                                user.role !== "admin" &&
                                                <li>
                                                    <Link to="/profile" className="dropdown-item" onClick={() => {
                                                        setShowDropmenu(false)
                                                    }}>
                                                        Profile <i className="fas fa-user"></i>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                user.role === "admin" && 
                                                <li>
                                                    <Link 
                                                        to="/admin" 
                                                        className="dropdown-item" 
                                                        onClick={() => setShowDropmenu(false)}
                                                    >
                                                        Admin <i className="fas fa-user-shield"></i>
                                                    </Link>
                                                </li>
                                            }

                                            <li>
                                                <Link to="/" className="dropdown-item" onClick={() => {
                                                    setShowDropmenu(false)
                                                    dispatch(logOut())
                                                }}>
                                                    Log Out <i className="fas fa-power-off"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </React.Fragment>
                                }
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
