import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {setIsInAdminArea, setTableHeadersAndData} from '../../actions/adminActions'
import Sidenav from './Sidenav'
import Layout from './Layout'
import Selected from './Selected'

const Dashboard = () => {
    const dispatch = useDispatch()

    const {selectedComponent} = useSelector(state => state.admin); 

    useEffect(() => {
        dispatch(setIsInAdminArea(true))
    }, [])

    useEffect(() => {
        dispatch(setTableHeadersAndData(selectedComponent));
    }, [selectedComponent])

    return (
        <div className="admin-dashboard">
            <Sidenav/>

            <div className="admin-container">

                {selectedComponent === "" && <Layout/>}

                {selectedComponent === "users" && 
                    <Selected 
                        title="Users" 
                        icon="fas fa-users" 
                    />
                }

                {selectedComponent === "courses" && 
                    <Selected 
                        title="Courses" 
                        icon="fas fa-chalkboard" 
                    />
                }

                {selectedComponent === "categories" && 
                    <Selected 
                        title="Categories" 
                        icon="fas fa-clipboard-list"
                    />
                }
            </div>
        </div>
    )
}

export default Dashboard
