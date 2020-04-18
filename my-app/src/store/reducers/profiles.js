import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    profiles:[],
    loading:false,
    purchased:false
}


const fetchDataStart = (state) => {
    return updateObject(state,{loading:true});
}
const fetchDataSuccess = (state,action) => {
    return updateObject(state, {
        profiles:action.data,
        loading:false
    });
}
const fetchDataFail = (state) => {
    return updateObject(state,{loading:false});
}

const profilesReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.FETCH_DATA_START:return fetchDataStart(state);
        case actionTypes.FETCH_DATA_SUCCESS:return fetchDataSuccess(state,action);  
        case actionTypes.FETCH_DATA_FAIL:return fetchDataFail(state);
        default :
        return state;
    }
}

export default profilesReducer;