import { 
    CHANGE_EMAIL, 
    CHANGE_FIRSTNAME, 
    CHANGE_LASTNAME, 
    CHANGE_PHOTO, 
    LOAD_USER, 
    LOGIN, 
    LOG_OUT, 
    REGISTER
} from "../actionTypes/userActionTypes";
import {toast} from 'react-toastify'
import { loading, loadingCompleted } from "./formActions";
import {API} from '../config'
import {getAxiosBody, getAxiosConfig} from '../helper'
import axios from "axios";

export const register = (firstName, lastName, email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true);
            const body = getAxiosBody({firstName, lastName, email, password});

            const res = await axios.post(`${API}/register`, body, config);

            dispatch({type: REGISTER, payload: res.data});

            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success("Your registration completed successfully!")
        } catch (err) {
            console.log(err.response.data)
            toast.error("Email is already taken!");  
        }finally{
            dispatch(loadingCompleted())
        }
    }
}

export const login = (email, password, adminLogin=false) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true);
            const body = getAxiosBody({email, password});

            let res;

            if(adminLogin){
                res = await axios.post(`${API}/login/admin`, body, config);
            }else{
                res = await axios.post(`${API}/login`, body, config);
            }

            dispatch({type: LOGIN, payload: res.data});

            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success("You have logged in successfully!")
        } catch (err) {
            toast.error(err.response.data.error);  
        }finally{
            dispatch(loadingCompleted())
        }
    }
}

export const logOut = () => {
    localStorage.removeItem("user");

    return {type: LOG_OUT}
}

export const loadUser = () => {
    let user = localStorage.getItem("user");
    if(user){
        return {type: LOAD_USER, payload: JSON.parse(user)}
    }else{
        return {type: "CANNOT_LOAD_USER"}
    }
}

export const changeFirstName = (userId, token, firstName) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true, token);
            const body = JSON.stringify({firstName});

            await axios.put(`${API}/user/first_name/${userId}`, body, config);

            dispatch({type: CHANGE_FIRSTNAME, payload: {firstName}})

            toast.success("Your first name updated successfully!")

            let user = JSON.parse(localStorage.getItem("user"))

            user.user.firstName = firstName;

            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            console.log(err)
            toast.error("First name could't be updated");
        }finally{
            dispatch(loadingCompleted())
        }
    }
    
}

export const changeLastName = (userId, token, lastName) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true, token);
            const body = JSON.stringify({lastName});

            await axios.put(`${API}/user/last_name/${userId}`, body, config);

            dispatch({type: CHANGE_LASTNAME, payload: {lastName}})

            toast.success("Your last name updated successfully!")

            let user = JSON.parse(localStorage.getItem("user"))

            user.user.lastName = lastName;

            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            toast.error("Last name could't be updated");
        }finally{
            dispatch(loadingCompleted())
        }
    }
    
}

export const changeEmail = (userId, token, email) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true, token);
            const body = JSON.stringify({email});

            await axios.put(`${API}/user/email/${userId}`, body, config);

            dispatch({type: CHANGE_EMAIL, payload: {email}})

            toast.success("Your email updated successfully!")

            let user = JSON.parse(localStorage.getItem("user"))

            user.user.email = email;

            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            toast.error("Email could't be updated");
        }finally{
            dispatch(loadingCompleted())
        }
    }
}

export const changePassword = (userId, token, password, newPassword) => {
    return async (dispatch) => {
        try {
            dispatch(loading())

            const config = getAxiosConfig(true, token);
            const body = JSON.stringify({password, newPassword});

            await axios.put(`${API}/user/password/${userId}`, body, config);

            toast.success("Your password updated successfully!")
        } catch (err) {
            toast.error(err.response.data.error);
        }finally{
            dispatch(loadingCompleted())
        }
    }
}

export const changePhoto = (userId, token, formData, photoURL) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.put(`${API}/user/photo/${userId}`, formData, config);

            dispatch({type: CHANGE_PHOTO, payload: {photoURL}})
        } catch (err) {
            toast.error("Profile photo couldn't be updated");
        }
    }
}