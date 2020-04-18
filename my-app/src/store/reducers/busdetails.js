import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';



const initialState = {
    data:[],
    loading:true,
    fetched:false,
}

const fetchBusStart = (state) => {
    return updateObject(state,{loading:true});
}
const fetchBusSuccess = (state,action) =>{
    const newData = updateObject(action.busDetail,{id:action.dataId});
    console.log(newData);
    return updateObject(state,{
        loading:false,
        purchased:true,
        data:state.data.concat(newData)
    });

}

const fetchBusFail = (state) => {
    return updateObject(state,{loading:true});
}


const detailReducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.FETCH_BUS_START:return fetchBusStart(state);
        case actionTypes.FETCH_BUS_SUCCESS:return fetchBusSuccess(state,action);
        case actionTypes.FETCH_BUS_FAIL:return fetchBusFail(state);
        default :
        return state;
    }
}

export default detailReducer;