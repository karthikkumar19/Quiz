import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';

export const fetchBusSuccess = (id, busDetail) => {
    return{
        type:actionTypes.FETCH_BUS_SUCCESS,
        dataId: id,
        busDetail:busDetail
    };
};

export const fetchBusFail = (error) => {
    return{
        type: actionTypes.FETCH_BUS_FAIL,
        error: error
    };
}

export const fetchBusStart = () =>{
    return{
        type:actionTypes.FETCH_BUS_START
    };
}

export const fetchBusDetail = (no) => {
    return dispatch => {
        dispatch (fetchBusStart());
axios.get( 'https://localrouting.firebaseio.com/buses.json?orderBy="busno"&equalTo="' + no + '"')
.then( response => {
console.log(response.data);
console.log(response.data.Busname);
const fetcheddata = [];
for(let key in response.data){
    fetcheddata.push({
        ...response.data[key],
        id:key
    });
    console.log(fetcheddata[0].names);  
}
dispatch(fetchBusSuccess(response.data.Busname,fetcheddata[0]));
} )
.catch( error => {
    dispatch(fetchBusFail(error));
} );   
    }
}
