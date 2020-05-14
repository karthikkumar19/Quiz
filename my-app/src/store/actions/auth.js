import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authstart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,localId,isSignup) => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:localId,
        redirectPath:isSignup
    }
}

export const authFail = (error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000);
    };
};

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authstart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=    AIzaSyD0TUQh41eKlkiCm0EtOAnTzeJWUe8iFcQ';
        if(!isSignup){
           url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyD0TUQh41eKlkiCm0EtOAnTzeJWUe8iFcQ';
        }
        axios.post(url,authData,isSignup)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            console.log(response.data.expiresIn)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId,isSignup));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}