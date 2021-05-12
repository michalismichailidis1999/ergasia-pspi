import React from 'react'
import "./style.css"
import { logOut } from '../../actions/userActions';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/layoutActions'
import { setCurrentCourse } from '../../actions/courseActions';

const LeftComponent = () => {
    const dispatch = useDispatch()
    
    const {user} = useSelector(state => state.user)

    return (
        <div className="leftComponent">
            <div className="leftComponent-box">
                <ul className="selectors">
                    {
                        user.role === "student" && 
                        <>
                            <li 
                                onClick={() => {
                                    dispatch(setSelectedComponent("progress"))
                                }}
                            >
                                <span>My Progress</span> <i className="fas fa-tasks"></i>
                            </li>
                            
                        </>
                    }

                    {
                        user.role === "teacher" &&
                        <>
                            <li 
                                onClick={() => {
                                    dispatch(setCurrentCourse(null))
                                    dispatch(setSelectedComponent("course-form"))
                                }}
                            >
                                <span>Create Course</span> <i className="fas fa-tasks"></i>
                            </li>
                        </>
                    }

                    {
                        (user.role === "student" || user.role === "teacher") && 
                        <li 
                            onClick={() => {
                                dispatch(setSelectedComponent("courses"))
                            }}
                        >
                            <span>My Courses</span> <i className="fas fa-chalkboard-teacher"></i>
                        </li>
                    }

                    <li  
                        onClick={() => {
                            dispatch(setSelectedComponent("settings"))
                        }}
                    >
                        <span>Profile Settings</span> <i className="fas fa-users-cog"></i>
                    </li>
                    <li>
                        <Link to="/" style={{ textDecoration: 'none', color:'inherit' }} onClick={() => {
                            dispatch(logOut())
                        }}>
                            <span>Log Out</span> <i className="fas fa-power-off"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftComponent