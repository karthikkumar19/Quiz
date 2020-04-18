import React, { Component } from 'react';
import {connect} from 'react-redux';

import Profiles from '../Profiles/profiles';
import classes from './main.module.css';
import Form from '../Addprofile/addpro';
import Layout from '../../hoc/Layout/Layout';

class Main extends Component{
    render(){
        console.log(this.props.form);
        console.log(this.props.authRedirectPath)
        let page = <Profiles/>
        if(this.props.form){
            page = <Form/>
        }
        return(
            <Layout>
    
            <div >
                {page}
            </div>
            </Layout>
        )
    }

    
}
const mapStateToProps = state => {
    return {
        form:state.auth.form,
        authRedirectPath:state.auth.authRedirectPath
    };
};



export default connect(mapStateToProps)(Main);
