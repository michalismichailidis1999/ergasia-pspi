import React from 'react'
import {Switch, Route} from 'react-router-dom'

// Components
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Layout from '../layout/Layout';
import PrivateRoute from './PrivateRoute'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
    )
}

export default Routes
