import React, { Component } from 'react';
import classes from './profiles.module.css';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Profiles extends Component{
    render(){
        return(
            <div className={classes.Main}>
                 <Jumbotron  fluid>
                <p>Tabs comes here {this.props.form}</p>
    </Jumbotron>
    <Link to="/logout">
    <Button variant="warning">Logout</Button>
    </Link>
            </div>
           
        )
    }
}

export default Profiles;