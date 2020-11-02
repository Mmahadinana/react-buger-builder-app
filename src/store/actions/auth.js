import * as actionTypes from './actionTypes';

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
    // localStorage.removeItem('token');
    // localStorage.removeItem('expiryTime');
    // localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceeded = () => {
    return{
            type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (timeExpired) => {

    return {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: timeExpired
    } 
}

export const setAuthRedirectPath = (path) => {
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const auth =(email, password, isSignup ) => {
    
    return{
        type:actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSignup:isSignup
    }
    
}

export const authCheckState = () => {
   return{
       type:actionTypes.AUTH_CHECK_INITIAL_STATE
   }
}