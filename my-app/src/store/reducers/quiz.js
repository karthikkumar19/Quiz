import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    questions:[],
    loading:false,
    fetched:false,
}



const fetchDataStart = (state) => {
    return updateObject(state,{loading:true});
}
const fetchDataSuccess = (state,action) => {
    return updateObject(state, {
        questions:action.data,
        loading:false,
        fetched:true,
        updated:false
    });
}
const fetchDataFail = (state) => {
    return updateObject(state,{loading:false});
}

const addScoreStart = (state) => {
    return updateObject(state,{loading:true});
}
const addScoreSuccess = (state,action) => {
    return updateObject(state, {
        score:action.data,
        loading:false,
        fetched:true,
        updated:true
    });
}
const addScoreFail = (state) => {
    return updateObject(state,{loading:false});
}

const quizReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.FETCH_DATA_START:return fetchDataStart(state);
        case actionTypes.FETCH_DATA_SUCCESS:return fetchDataSuccess(state,action);  
        case actionTypes.FETCH_DATA_FAIL:return fetchDataFail(state);
        case actionTypes.ADD_SCORE_START:return addScoreStart(state);
        case actionTypes.ADD_SCORE_SUCCESS:return addScoreSuccess(state,action);  
        case actionTypes.ADD_SCORE_FAIL:return addScoreFail(state);

        default :
        return state;
    }
}

export default quizReducer;