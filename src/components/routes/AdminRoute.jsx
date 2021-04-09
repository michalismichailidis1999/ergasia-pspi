import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = (props) => {
    const {isAuthenticated, user} = useSelector(state => state.user);

    return (
        isAuthenticated && user.role === "admin" ? <Route {...props} /> : <Redirect to="/admin/login" />
    )
}

export default AdminRoute
