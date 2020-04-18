import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asynComponent';
import './App.css';

// const asyncAddData = asyncComponent(() => {
//   return import('./container/AddData');
// });

const asyncGuest = asyncComponent(() => {
  return import('./container/guest/guest');
})

const asyncHome = asyncComponent(()=>{
  return import('./container/home/home');
})


// const asyncAuth = asyncComponent(() => {
//   return import('./container/Auth/Auth');
// });

class App extends React.Component  {

  componentDidMount () {
    // this.props.onTryAutoSignup();
  }
  
render(){

  let routes = (
    <Switch>
      
      <Route path="/" exact component={asyncHome}  />
      <Route path="/guest" exact component={asyncGuest}/>
      <Redirect to="/" />
    </Switch>
  );

  // if ( this.props.isAuthenticated ) {
  //   console.log(this.props.isAuthenticated);
  //   routes = (
  //     <Switch>
  //       <Route path="/logout" exact component={Logout} /> 
  //       <Route path="/auth" component={asyncAuth} />
  //       <Route path="/add" exact component={asyncAddData}  />
  //     <Route path="/" exact component={Busdata} />
  //     <Route path="/bus:id" exact component={Busdetails} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );
  //     }
  
  return(
    <div >
       {/* <Helmet>
                <style>{'body { background: #5D5F71;  }'}</style>
            </Helmet> */}
    
    {routes}
 </div>
  )
}
}


// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onTryAutoSignup: () => dispatch( actions.authCheckState() )
//   };
// };

export default withRouter( App  );