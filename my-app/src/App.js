import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import* as actions from './store/actions/index';
import {connect} from 'react-redux';
import Auth from './quiz/Auth/Auth';
import Logout from './quiz/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asynComponent';




const asyncAdd = asyncComponent(() => {
  return import('./quiz/AddQuiz/addquiz');
})

const asyncUser = asyncComponent(() => {
  return import('./quiz/user/user');
})

const asyncHome = asyncComponent(() => {
  return import ('./quiz/home');
})

const asyncQuiz = asyncComponent(() => {
  return import ('./quiz/quiz');
})

const asyncQuizes = asyncComponent(() => {
  return import ('./quiz/Quizes/quizes');
})

const asyncScores = asyncComponent(() => {
  return import ('./quiz/Scores/scores');
})

class App extends React.Component  {

  
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
render(){

  let routes = (
    <Switch>
            <Route path="/auth" component={Auth} />
      <Route path="/" exact component={asyncHome}  />
      <Route path="/add" exact component={asyncAdd} />

      <Redirect to="/" />
    </Switch>
  );

  if ( this.props.isAuthenticated ) {
    routes = (
      <Switch>
        <Route path="/quizes" exact component={asyncQuizes}></Route>
              <Route path="/quiz" exact component={asyncQuiz}/> 
        <Route path="/user" component={asyncUser}/>
         <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Auth}  />
        <Route path="/scores" exact component={asyncScores} />
       <Route path="/add" exact component={asyncAdd} />
      <Redirect to="/" />
      </Switch>
    );
      }
  



  return(
    <div  >
       
    
            {routes}
 </div>
  )
}
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
