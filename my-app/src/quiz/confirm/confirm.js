import React from 'react';
import {Button,Card} from 'react-bootstrap';
import classes from '../user/user.module.css';

const Confirm = props => {
    return(
        <div>
            <h3>Rules and Regulations</h3>
            <Card className={classes.rule} body><ul>
                <li>Don't Reload the Page</li>
                <li>Be honest to attend the Quiz</li>
                <li>Finish the test in 30mins</li>
                </ul></Card>
          <div className={classes.button}>
          <Button variant="success"  onClick={props.continue}>Start</Button>
            <Button variant="danger"  onClick={props.cancel}>Cancel</Button>
          </div>
           
        </div>
    )
}

export default Confirm;