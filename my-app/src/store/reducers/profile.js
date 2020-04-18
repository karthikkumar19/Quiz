import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    pages:[],
    loading:false,
    fetched:false,
    purchased:false
}
const addDataInit = (state) => {
    return updateObject(state,{purchased:false});
}
const addDataStart = (state) => {
    return updateObject(state,{loading:true});
}
const addDataSuccess = (state,action,props) =>{
    const newPage = updateObject(action.pageData,{id:action.pageId});
    return updateObject(state,{
        loading:false,
        purchased:true,
        pages:state.pages.concat(newPage)
    });
}
const addDataFail = (state) => {
    return updateObject(state,{loading:false});
}

const profileReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.ADD_DATA_INIT:return addDataInit(state);
        case actionTypes.ADD_DATA_START:return addDataStart(state);
        case actionTypes.ADD_DATA_SUCCESS:return addDataSuccess(state,action);
        case actionTypes.ADD_DATA_FAIL:return addDataFail(state);
        // case actionTypes.EDIT_PAGE_INIT:return editPageInit(state);
        // case actionTypes.EDIT_PAGE_START:return editPageStart(state);
        // case actionTypes.EDIT_PAGE_SUCCESS:return editPageSuccess(state);
        // case actionTypes.EDIT_PAGE_FAIL:return editPageFail(state);
        // case actionTypes.FETCH_PAGES_START:return fetchPagesStart(state);
        // case actionTypes.FETCH_PAGES_SUCCESS:return fetchPagesSuccess(state,action);  
        // case actionTypes.FETCH_PAGES_FAIL:return fetchPagesFail(state);
        default :
        return state;
    }
}

export default profileReducer;