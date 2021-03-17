import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { logOut } from '../../actions/userActions';

const Sidenav = () => {
    const dispatch = useDispatch()

    const {isAuthenticated} = useSelector(state => state.user);

    const links = [
        {
            id: "link-1",
            to: "/register",
            icon: "fas fa-user-plus",
            action: null
        },
        {
            id: "link-2",
            to: "/login",
            icon: "fas fa-user-check",
            action: null
        }
    ]

    const authenticatedLinks = [
        {
            id: "authenticated-link-1",
            to: "/profile",
            icon: "far fa-id-badge",
            action: null
        },
        {
            id: "authenticated-link-2",
            to: "/",
            icon: "fas fa-power-off",
            action: () => dispatch(logOut())
        }
    ]

    const [showNav, setShowNav] = useState(false);

    return (
        <React.Fragment>
            <div className={showNav ? "hamburger close-nav" : "hamburger"} onClick={() => setShowNav(!showNav)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className="responsive-nav">
                {!isAuthenticated && links.map(
                    (link, i) => 
                        <li 
                            key={link.id} 
                            style={{transition: `transform ${250 + i * 100}ms ease-in`}} 
                            className={showNav ? "nav-item show" : "nav-item"}
                        >
                            <NavLink 
                                className="nav-link" 
                                to={link.to}
                                onClick={() => setShowNav(false)}
                            >
                                <i className={link.icon}></i>
                            </NavLink>
                        </li>
                )}

                {isAuthenticated && authenticatedLinks.map(
                    (link, i) => 
                        <li 
                            key={link.id} 
                            style={{transition: `transform ${250 + i * 100}ms ease-in`}} 
                            className={showNav ? "nav-item show" : "nav-item"}
                        >
                            <NavLink 
                                className="nav-link" 
                                to={link.to}
                                onClick={() => {
                                    if(link.action){
                                        link.action();
                                    }
                                    
                                    setShowNav(false)
                                }}
                            >
                                <i className={link.icon}></i>
                            </NavLink>
                        </li>
                )}
            </ul>
        </React.Fragment>
    )
}

export default Sidenav
