import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addDataSuccess = (id, pageData) => {
    return{
        type:actionTypes.ADD_DATA_SUCCESS,
        pageId: id,
        pageData:pageData
    };
};

export const addDataFail = (error) => {
    return{
        type: actionTypes.ADD_DATA_FAIL,
        error: error
    };
}

export const addDataStart = () =>{
    return{
        type:actionTypes.ADD_DATA_START
    };
}

export const addData = (proData) => {
    return dispatch => {
        dispatch (addDataStart());
        axios.post( 'https://sme-startup.firebaseio.com/profiles.json', proData )
        .then( response => {
            dispatch(addDataSuccess(response.data.name, proData));
        } )
        .catch( error => {
            dispatch(addDataFail(error));
        } );
    }
}

export const addDataInit = () => {
    return {
        type:actionTypes.ADD_DATA_INIT
    };
};