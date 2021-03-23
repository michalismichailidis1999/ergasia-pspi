import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { authenticatedLinks, links } from './links';

const Sidenav = () => {
    const {isAuthenticated} = useSelector(state => state.user);

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
                            <Link 
                                className="nav-link" 
                                to={link.to}
                                onClick={() => setShowNav(false)}
                            >
                                <i className={link.icon}></i>
                            </Link>
                        </li>
                )}

                {isAuthenticated && authenticatedLinks.map(
                    (link, i) => 
                        <li 
                            key={link.id} 
                            style={{transition: `transform ${250 + i * 100}ms ease-in`}} 
                            className={showNav ? "nav-item show" : "nav-item"}
                        >
                            <Link 
                                className="nav-link" 
                                to={link.to}
                                onClick={() => setShowNav(false)}
                            >
                                <i className={link.icon}></i>
                            </Link>
                        </li>
                )}
            </ul>
        </React.Fragment>
    )
}

export default Sidenav
