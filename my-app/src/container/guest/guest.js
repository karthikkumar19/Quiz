import React from 'react';
import {Card} from 'react-bootstrap';
import classes from './guest.module.css';

const Guest = props => {
    return(
<div>
<Card className={classes.Guestcard} body>This Card for Guest users only.</Card>
</div>
    )
}

export default Guest;