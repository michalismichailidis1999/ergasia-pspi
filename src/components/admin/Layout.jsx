import React from 'react'
import {Pie, Line} from 'react-chartjs-2'
import { useSelector } from 'react-redux'

const Layout = () => {
    const {pieChart, lineChart, users} = useSelector(state => state.admin)
    const {categories} = useSelector(state => state.category)
    const {courses} = useSelector(state => state.course)

    return (
        <>
            <h1>Dashboard <i className="fas fa-tachometer-alt"></i></h1>

            <div className="boxes">
                <div className="box">
                    <div className="icon">
                        <i className="fas fa-users"></i>
                    </div>

                    <span>Total Users: {users.length}</span>
                </div>

                <div className="box">
                    <div className="icon">
                        <i className="fas fa-chalkboard"></i>
                    </div>

                    <span>Total Courses: {courses.length}</span>
                </div>

                <div className="box">
                    <div className="icon">
                        <i className="fas fa-clipboard-list"></i>
                    </div>

                    <span>Total Categories: {categories.length}</span>
                </div>
            </div>

            {
                lineChart && pieChart &&
                <div className="charts">
                    <div className="chart">
                        <Pie data={pieChart.data} options={pieChart.options}/>
                    </div>

                    <div className="chart">
                        <Line data={lineChart.data} options={lineChart.options}/>
                    </div>
                </div>
            }
        </>
    )
}

export default Layout
