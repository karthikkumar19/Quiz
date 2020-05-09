import React from 'react';
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import Logout from './container/Auth/Logout/Logout';
// import* as actions from './store/actions/index';
// import {connect} from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asynComponent';
import './App.css';
import Home from './quiz/home';



// const asyncGuest = asyncComponent(() => {
//   return import('./container/guest/guest');
// })

// const asyncHome = asyncComponent(()=>{
//   return import('./container/home/home');
// })

// const asyncSmelogin = asyncComponent(() => {
//   return import('./container/Auth/Auth')
// })

// const asyncMain = asyncComponent(()=>{
//   return import('./container/Main/main');
// })

// const asyncForm = asyncComponent(() =>{
//   return import('./container/Addprofile/addpro');
// })


class App extends React.Component  {

  
  // componentDidMount () {
  //   this.props.onTryAutoSignup();
  // }
  
render(){

  // let routes = (
  //   <Switch>
      
  //     <Route path="/" exact component={asyncHome}  />
  //     <Route path="/guest" exact component={asyncGuest}/>
  //     <Route path="/smeauth" exact component={asyncSmelogin} />
  //     <Redirect to="/" />
  //   </Switch>
  // );

  // if ( this.props.isAuthenticated ) {
  //   routes = (
  //     <Switch>
  //       <Route path="/form" exact component={asyncForm}/>
  //             <Route path="/main" exact component={asyncMain}/>
        
  //       <Route path="/logout" exact component={Logout} /> 
  //       <Route path="/" exact component={asyncHome}  />
  //     <Route path="/guest" exact component={asyncGuest}/>
  //     <Route path="/smeauth" exact component={asyncSmelogin} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );
  //     }
  



  return(
    <div >
       {/* <Helmet>
                <style>{'body { background: #5D5F71;  }'}</style>
            </Helmet> */}
    
            <Home/>
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

// export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
export default App;