import React, { useEffect } from 'react'
import { useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import './style.css'

const Layout = () => {
    const history = useHistory();

    const {isAuthenticated} = useSelector(state => state.user)

    useEffect(() => {
        if(isAuthenticated){
            history.push("/dashboard")
        }
    }, [isAuthenticated])

    return (
        <div className="layout">
            <div className="layout-top">
                <div className="container">
                    <div className="layout-top-left">
                        <h2>Free Education Courses</h2>

                        <ul>
                            <li>
                                <i className="fas fa-award"></i> Over 1000 free courses
                            </li>

                            <li>
                                <i className="fas fa-award"></i> Over 100 teachers
                            </li>

                            <li>
                                <i className="fas fa-award"></i> You get a certificate every time you complete a course
                            </li>
                        </ul>

                        <Link to="/register" className="redirect-link-btn">Register</Link>
                    </div>

                    <div className="layout-top-right">
                        <img src="/assets/images/girl-student.jpg" alt="Girl College Student"/>
                    </div>
                </div>
            </div>

            <div className="layout-bottom">
                <div className="container">
                    <h2>Course Categories</h2>

                    <ul className="categories">
                        <li>
                            <div className="icon">
                                <span>f(x)</span>
                            </div>

                            <h4>Maths</h4>
                        </li>

                        <li>
                            <div className="icon">
                                <i className="fas fa-atom"></i>
                            </div>

                            <h4>Physics</h4>
                        </li>

                        <li>
                            <div className="icon">
                                <i className="fas fa-flask"></i>
                            </div>

                            <h4>Chemistry</h4>
                        </li>

                        <li>
                            <div className="icon">
                                <i className="fas fa-laptop-code"></i>
                            </div>

                            <h4>Computer</h4>
                            <h4>Science</h4>
                        </li>

                        <li>
                            <div className="icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <h4>Foreign</h4>
                            <h4>Languages</h4>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <h4>History</h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Layout
