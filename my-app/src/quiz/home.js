import React,{useState,Component} from 'react';
import Layout from '../hoc/Layout/Layout';
import * as actions from '../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

class Home extends Component {
    render(){
        const onPage = e => {
            console.log(this.props.isAuthenticated)
            if(!this.props.isAuthenticated){
                if(e.target.name === 'quiz'){
                    this.props.onSetAuthRedirectPath('/quiz');
                    this.props.history.push('/auth')
                }
                else{
                    this.props.onSetAuthRedirectPath('/add');
                    this.props.history.push('/auth')
                }
            }else{
                if(e.target.name === 'quiz'){
                    this.props.history.push('/quiz') 
                }else{
                    this.props.history.push('/add')
                }
            }
            
          }
        
            return(
                <div>
                    <Layout>
         <button onClick={(e) => onPage(e)} name="quiz" >  Quiz</button>
         <button >  Add Quiz</button>
        
         
                
                </Layout>
                </div>
               
        
            )
        }
    }
    



   

  




const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( Home, axios ));