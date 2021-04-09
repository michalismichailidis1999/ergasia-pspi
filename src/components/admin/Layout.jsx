import React from 'react'
import {Pie, Line} from 'react-chartjs-2'
import { pieChart, lineChart } from '../../dummyData/chart'

const Layout = () => {
    return (
        <>
            <h1>Dashboard <i className="fas fa-tachometer-alt"></i></h1>

            <div className="boxes">
                <div className="box">
                    <div className="icon">
                        <i className="fas fa-users"></i>
                    </div>

                    <span>Total Users: 500</span>
                </div>

                <div className="box">
                    <div className="icon">
                        <i className="fas fa-chalkboard"></i>
                    </div>

                    <span>Total Courses: 6000</span>
                </div>

                <div className="box">
                    <div className="icon">
                        <i className="fas fa-clipboard-list"></i>
                    </div>

                    <span>Total Categories: 20</span>
                </div>
            </div>

            <div className="charts">
                <div className="chart">
                    <Pie data={pieChart.data} options={pieChart.options}/>
                </div>

                <div className="chart">
                    <Line data={lineChart.data} options={lineChart.options}/>
                </div>
            </div>
        </>
    )
}

export default Layout
