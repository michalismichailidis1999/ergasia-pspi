import React, { useEffect } from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Contact from '../contact/Contact';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import Layout from '../layout/Layout';
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import AdminDashboard from '../admin/Dashboard'
import AdminLogin from '../admin/Login'
import Course from '../course/Course';
import Lesson from '../course/Lesson';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/contact" component={Contact}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/course/:courseId" component={Course}/>
            <PrivateRoute exact path="/lesson/:lessonId" component={Lesson}/>
            <AdminRoute exact path="/admin" component={AdminDashboard}/>
            <Route exact path="/admin/login" component={AdminLogin} />
        </Switch>
    )
}

export default Routes
