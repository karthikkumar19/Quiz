import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addProfileSuccess = (id, profileData) => {
    return{
        type:actionTypes.ADD_PROFILE_SUCCESS,
        profileId: id,
        profileData:profileData
    };
};

export const addProfileFail = (error) => {
    return{
        type: actionTypes.ADD_PROFILE_FAIL,
        error: error
    };
}

export const addProfileStart = () =>{
    return{
        type:actionTypes.ADD_PROFILE_START
    };
}

export const addProfile = (profileData,token) => {
    return dispatch => {
        dispatch (addProfileStart());
        axios.post( 'https://quiz-4cf36.firebaseio.com/profile.json?auth=' + token,profileData )
        .then( response => {
            dispatch(addProfileSuccess(response.data.name, profileData));
        } )
        .catch( error => {
            dispatch(addProfileFail(error));
        } );
    }
}

export const addProfileInit = () => {
    return {
        type:actionTypes.ADD_DATA_INIT
    };
};

export const fetchProfileSuccess = (data) => {
    return{
        type:actionTypes.FETCH_PROFILE_SUCCESS,
        data:data
    };
};

export const fetchProfileFail = (error) =>{
    return{
        type:actionTypes.FETCH_PROFILE_FAIL,
        error:error
    };
};

export const fetchProfileStart = () => {
    return{
        type:actionTypes.FETCH_PROFILE_START
    };
};

export const highScores = (newState) => {
    console.log("work")
    return dispatch => {
        dispatch(fetchProfileStart());
        newState.sort((a, b) => parseFloat(b.score.score) - parseFloat(a.score.score));
        dispatch(fetchProfileSuccess(newState));
        console.log('we')
    }
}

export const lowScores = (newState) => {
    return dispatch => {
        dispatch(fetchProfileStart());
        newState.sort((a, b) => parseFloat(a.score.score) - parseFloat(b.score.score));
        dispatch(fetchProfileSuccess(newState));
    }
}

export const fetchProfile = (token, userId) => {
    return dispatch => {
        dispatch(fetchProfileStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://quiz-4cf36.firebaseio.com/profile.json' + queryParams )
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                }
               
               
                dispatch(fetchProfileSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchProfileFail(err));
            });
    }
}






export const fetchProfiles = () => {
    return dispatch => {
        dispatch(fetchProfileStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://quiz-4cf36.firebaseio.com/profile.json'  )
            .then(res => {
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    });
                }
               
               
                dispatch(fetchProfileSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchProfileFail(err));
            });
    }
}