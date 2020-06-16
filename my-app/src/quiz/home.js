import React,{Component} from 'react';
import {Jumbotron,Button} from 'react-bootstrap';
import classes from './home.module.css';
import {Helmet} from 'react-helmet';

class Home extends Component {
   
    LoginHandler = e => {
        e.preventDefault();
        this.props.history.push('/auth');
    }

    render(){
        

        return(
           
 <div className={classes.main} >
      <Helmet>
                <style>{'body { background: #333333;  }'}</style>
            </Helmet>
    
                <Jumbotron className={classes.jumbo}>
  <h1>PSNA College of Engineering and Technology</h1>
  <p>
    A quiz competition is organized by dept of electrical and electronics. 
  </p>
  <h4>GREY MATTER</h4>
  <div>Staff Coordinator</div>
  <span className={classes.stucor}>
  Rajendran Joseph Rathish
  </span>
  <div>Student Coordinators</div>
  <span className={classes.stucor}>
  S.Dinesh - V.Harshitkumar
  </span>
  
    <Button onClick={this.LoginHandler} variant="primary">Login to continue</Button>
  
</Jumbotron>
               
            
            </div>
           
        )
    }
}



export default Home;

