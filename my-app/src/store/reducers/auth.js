import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    quizes:[],
    fetched:false,
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, {error:null, loading:true});
};

const authSuccess = (state, action) => {
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false,
    });
}


const authFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const authLogout = (state,action) => {
    return updateObject(state,{
        token:null,
        userId:null
    })
};

const setAuthRedirectPath = (state,action) => {
    return updateObject(state,{
        authRedirectPath:action.path
    });
};

const addDataInit = (state) => {
    return updateObject(state,{fetched:false});
}
const addDataStart = (state) => {
    return updateObject(state,{loading:true});
}
const addDataSuccess = (state,action,props) =>{
    const newQuiz = updateObject(action.quizData,{id:action.quizId});
    return updateObject(state,{
        loading:false,
        fetched:true,
        quizes:state.quizes.concat(newQuiz)
    });
}
const addDataFail = (state) => {
    return updateObject(state,{loading:false});
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.ADD_DATA_INIT:return addDataInit(state);
        case actionTypes.ADD_DATA_START:return addDataStart(state);
        case actionTypes.ADD_DATA_SUCCESS:return addDataSuccess(state,action);
        case actionTypes.ADD_DATA_FAIL:return addDataFail(state);
        // case actionTypes.EDIT_PAGE_INIT:return editPageInit(state);
        // case actionTypes.EDIT_PAGE_START:return editPageStart(state);
        // case actionTypes.EDIT_PAGE_SUCCESS:return editPageSuccess(state);
        // case actionTypes.EDIT_PAGE_FAIL:return editPageFail(state);
        
        default: return state
    }
}

export default authReducer;