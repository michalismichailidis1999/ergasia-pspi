import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {getUsers, setIsInAdminArea, setLineChart, setPieChart} from '../../actions/adminActions'
import Sidenav from './Sidenav'
import Layout from './Layout'
import Selected from './Selected'
import { fetchCategories } from '../../actions/categoryActions'
import {getCourses} from '../../actions/courseActions'
import {pieChart, lineChart} from './data/chart'

const Dashboard = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user); 
    const {categories} = useSelector(state => state.category); 
    const {selectedComponent} = useSelector(state => state.layout); 

    useEffect(() => {
        dispatch(setIsInAdminArea(true))
        dispatch(getUsers(user.id, token))
        dispatch(fetchCategories(user.id, token));
        dispatch(getCourses(user.id, token, "None", "all"))
        dispatch(setLineChart(user.id, token, lineChart));
    }, [])

    useEffect(() => {
        if(categories.length > 0){
            dispatch(setPieChart(user.id, token, pieChart, categories));
        }
    }, [categories])

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
