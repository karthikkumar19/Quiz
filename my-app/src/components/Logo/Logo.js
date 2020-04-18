import React from 'react';
import {Link} from 'react-router-dom';
// import busLogo from '../../assets/bus.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
    {/* <Link to="/">
    {/* <img src={busLogo} alt="BusLogo" /> */}

    
    </div>
);

export default logo;