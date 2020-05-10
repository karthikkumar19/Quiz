import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    profile:[],
    loading:false,
    fetched:false,
    authRedirectPath: '/user'
}



const fetchProfileStart = (state) => {
    return updateObject(state,{loading:true});
}
const fetchProfileSuccess = (state,action) => {
    return updateObject(state, {
        profile:action.data,
        loading:false,
        fetched:true
    });
}
const fetchProfileFail = (state) => {
    return updateObject(state,{loading:false});
}

const profileReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.FETCH_PROFILE_START:return fetchProfileStart(state);
        case actionTypes.FETCH_PROFILE_SUCCESS:return fetchProfileSuccess(state,action);  
        case actionTypes.FETCH_PROFILE_FAIL:return fetchProfileFail(state);
        default :
        return state;
    }
}

export default profileReducer;