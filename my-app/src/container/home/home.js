import React from 'react';
import {Link} from 'react-router-dom';
import classes from './home.module.css';
import { Button } from 'react-bootstrap';

const Home = props => {
    return(
        <div className={classes.Home}>
           <Link to="/guest">
           <Button className={classes.Button} variant="primary" >Guest</Button>
           </Link> 
            <br/>
            <Button className={classes.Button} variant="success">SME Login</Button>
        </div>
    )
}

export default Home;