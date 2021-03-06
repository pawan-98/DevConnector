import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import setAuthToken from '../utils/setAuthToken';

export const loadUser = ()=> async dispatch =>{
    console.log("Loacal storage :- "+localStorage.token);
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        console.log("trying")
        const res = await axios.get('/api/auth');
        console.log(res.data);
        dispatch(
            {
                type:USER_LOADED,
                payload:res.data
            }
        );
    } catch(err){
        console.log(err);
        dispatch({
            type:AUTH_ERROR
        })
    }
} 

//Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        console.log("Response data:- "+res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }
}


//Login User
export const login = (email, password) => async dispatch => {
    console.log(email+" "+password);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        console.log("Response data:- "+res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type:LOGIN_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({type:CLEAR_PROFILE});
    dispatch({type:LOGOUT});
}