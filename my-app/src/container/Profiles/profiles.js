import React, { Component } from 'react';
import classes from './profiles.module.css';
import {connect} from 'react-redux';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Jumbotron,Card} from 'react-bootstrap';

class Profiles extends Component{
    state = {
        profiles: [],
        loading: true
    }


    componentDidMount() {
        this.props.onFetchProfiles(this.props.token,this.props.userId);
     }

    render(){

        let profiles = <Spinner/>
        if(!this.props.loading){
            profiles = 
                this.props.profiles.map(profile => (
                <Card className={classes.Procard} body><h3>{profile.formData.name}</h3>
                <h5>{profile.formData.ownerName}</h5>
                <h6>{profile.formData.email}</h6>
                </Card>    
                            ))
                }
        return(
            <div className={classes.Main}>
                 <Jumbotron  fluid>
                <p>SME Lists</p>
    </Jumbotron>
    {profiles}
            </div>
           
        )
    }
}
const mapStateToProps = state => {
    return{
        profiles:state.prodata.profiles,
        loading:state.prodata.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfiles : (token, userId) => dispatch(actions.fetchData(token, userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Profiles, axios));
