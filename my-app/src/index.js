import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose,combineReducers} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import thunk from 'redux-thunk';
import App from './App';
import authReducer from './store/reducers/auth';
import quizReducer from './store/reducers/quiz';
import profileReducer from './store/reducers/profile';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  quizdata:quizReducer,
  profile:profileReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
<Provider store={store}>
<BrowserRouter >
    <App />
    </BrowserRouter>
</Provider>
)

ReactDOM.render(app,  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
