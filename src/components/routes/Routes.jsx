import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Contact from '../contact/Contact';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../profile/Profile';
import Layout from '../layout/Layout';
import PrivateRoute from './PrivateRoute'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/contact" component={Contact}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
        </Switch>
    )
}

export default Routes
