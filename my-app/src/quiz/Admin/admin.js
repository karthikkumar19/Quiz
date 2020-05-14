import React,{Component} from 'react';
import {Button,Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from '../user/user.module.css';

class Admin extends Component{

  
    render(){

let admin = this.props.profile.map((pro,ind) => {
       return(
          
           <div key={ind}>
           <h3 className={classes.welcom}>Welcome {pro.formData.name}</h3>
                      </div>
       )
       
   })

        return(
            <div>
                {admin}
               <Link to="/add"> <Button>Add Quiz</Button></Link> 
               <Link to="/quizes">  <Button>View Quiz <Badge variant="light"></Badge></Button></Link>
               <Link to="/scores">  <Button>View Scores</Button></Link>
            </div>
        )
    }
}

export default Admin;