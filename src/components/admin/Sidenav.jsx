import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setSelectedComponent } from '../../actions/layoutActions'
import {logOut} from '../../actions/userActions'
import {setCategoryToEdit} from '../../actions/categoryActions'

const Sidenav = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    return (
        <nav className="sidenav">
            <div className="navbar-brand">
                <span onClick={() => dispatch(setSelectedComponent(""))}>ErgasiaPSPI</span>
            </div>

            <ul>
                <li 
                    onClick={() => {
                        dispatch(setCategoryToEdit(null))
                        dispatch(setSelectedComponent("users"))
                    }}
                >
                    <i className="fas fa-users"></i> Users
                </li>

                <li 
                    onClick={() => {
                        dispatch(setCategoryToEdit(null))
                        dispatch(setSelectedComponent("courses"))
                    }}
                >
                    <i className="fas fa-chalkboard"></i> Courses
                </li>

                <li 
                    onClick={() => {
                        dispatch(setCategoryToEdit(null))
                        dispatch(setSelectedComponent("categories"))
                    }}
                >
                    <i className="fas fa-clipboard-list"></i> Categories
                </li>

                <li 
                    onClick={() => {
                        dispatch(setCategoryToEdit(null))
                        history.push("/dashboard")
                    }}
                >
                    <i className="fas fa-home"></i> Home
                </li>

                <li 
                    onClick={() => {
                        dispatch(setCategoryToEdit(null))
                        dispatch(logOut())
                    }}
                >
                    <i className="fas fa-power-off"></i> Log Out
                </li>
            </ul>
        </nav>
    )
}

export default Sidenav
