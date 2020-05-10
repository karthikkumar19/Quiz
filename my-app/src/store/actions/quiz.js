import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addDataSuccess = (id, quizData) => {
    return{
        type:actionTypes.ADD_DATA_SUCCESS,
        quizId: id,
        quizData:quizData
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

export const addData = (quizData) => {
    return dispatch => {
        dispatch (addDataStart());
        axios.post( 'https://quiz-4cf36.firebaseio.com/quiz.json',quizData )
        .then( response => {
            dispatch(addDataSuccess(response.data.name, quizData));
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
        axios.get('https://quiz-4cf36.firebaseio.com/quiz.json' )
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

export const addScoreSuccess = (id, scoreData) => {
    return{
        type:actionTypes.ADD_SCORE_SUCCESS,
        scoreId: id,
        scoreData:scoreData
    };
};

export const addScoreFail = (error) => {
    return{
        type: actionTypes.ADD_SCORE_FAIL,
        error: error
    };
}

export const addScoreStart = () =>{
    return{
        type:actionTypes.ADD_SCORE_START
    };
}

export const addScore = (id,scoreData) => {
    return dispatch => {
        dispatch (addScoreStart());
        axios.put( `https://quiz-4cf36.firebaseio.com/profile/${id}/score.json`,scoreData )
        .then( response => {
            dispatch(addScoreSuccess(response.data.name, scoreData));
        } )
        .catch( error => {
            dispatch(addScoreFail(error));
        } );
    }
}

export const addScoreInit = () => {
    return {
        type:actionTypes.ADD_SCORE_INIT
    };
};