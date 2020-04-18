import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from './main.module.css';
import Layout from '../../hoc/Layout/Layout';

const Main = props =>{
    return(
        <Layout>

        <div className={classes.Main}>
            <Jumbotron  fluid>
            <p>Tabs comes here</p>
</Jumbotron>
<Link to="/logout">
<Button variant="warning">Logout</Button>
</Link>
        </div>
        </Layout>
    )
}

export default Main;