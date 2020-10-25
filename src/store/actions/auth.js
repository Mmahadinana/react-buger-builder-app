import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
         type: actionTypes.AUTH_START
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
   }
}

export const authSuccess = (authData) => {
    
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData:authData
   }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (timeExpired) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, timeExpired * 1000)
    } 
}

export const setAuthRedirectPath = (path) => {
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const auth =(email, password, isSignup ) => {
    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken:true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqzir_UEO5YJ-45Eby6k1MhAUrpwkrUNg';
        if(!isSignup){
           
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqzir_UEO5YJ-45Eby6k1MhAUrpwkrUNg'
        }
        axios.post(url, authData).then(
            response => {
                const expiryTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expiryTime',expiryTime);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authSuccess(response.data));
                // dispatch(setAuthRedirectPath(path))
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expiryTime = new Date(localStorage.getItem('expiryTime'));
            if(expiryTime <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId');
                 dispatch(authSuccess({'localId': userId,'idToken':token}));
                 dispatch(checkAuthTimeout((expiryTime.getTime() - new Date().getTime()) / 1000));
            }
           
        }
    }
}