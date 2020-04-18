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

export const addData = (proData,token) => {
    return dispatch => {
        dispatch (addDataStart());
        axios.post( 'https://sme-startup.firebaseio.com/profiles.json?auth' + token, proData )
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

export const fetchDataSuccess = (data) => {
    return{
        type:actionTypes.FETCH_DATA_SUCCESS,
        data:data
    };
};

export const fetchDataFail = (error) =>{
    return{
        type:actionTypes.FETCH_DATA_FAIL,
        error:error
    };
};

export const fetchDataStart = () => {
    return{
        type:actionTypes.FETCH_DATA_START
    };
};

export const fetchData = (token, userId) => {
    return dispatch => {
        dispatch(fetchDataStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://sme-startup.firebaseio.com/profiles.json' )
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchDataSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchDataFail(err));
            });
    }
}