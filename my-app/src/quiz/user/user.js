import React,{Component} from 'react';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Addpro from '../Addprofile/addpro';
import Confirm from '../confirm/confirm';
import Admin from '../Admin/admin';

class User extends Component {

    componentDidMount(){
        this.props.onFetchProfile(this.props.token,this.props.userId);
        console.log(this.props.profile,this.props.form)
        
    }
    
state={
    continue:false,
    profile:[]
}

quizHandler = () => {
          console.log('clcik')
    this.setState( { continue: true } );
}

quizCancelHandler = () => {
this.setState( { continue: false } );
}

quizContinueHandler = () => {
this.props.history.push('/quiz');
};

    render(){
        // const onPage = e => {
        //     console.log(this.props.isAuthenticated)
        //     if(!this.props.isAuthenticated){
        //         if(e.target.name === 'quiz'){
        //             this.props.onSetAuthRedirectPath('/quiz');
        //             this.props.history.push('/auth')
        //         }
        //         else{
        //             this.props.onSetAuthRedirectPath('/add');
        //             this.props.history.push('/auth')
        //         }
        //     }else{
        //         if(e.target.name === 'quiz'){
        //             this.props.history.push('/quiz') 
        //         }else{
        //             this.props.history.push('/add')
        //         }
        //     }
            
          
         
            let user = <Spinner/>
          let confirm = null;
          confirm = <Confirm continue={this.quizContinueHandler} cancel={this.quizCancelHandler} />

          if(!this.props.loading){
              console.log(this.props.profile)
              if(this.props.isAdmin){
                  user = <Admin profile={this.props.profile}/>
              }else{
                user=   this.props.profile.map((pro) => {
                    console.log(pro)
                       return(
                          
                           <div>
                           <h3>Name:- {pro.formData.name}</h3>
                                   {pro.score.submitted ? <h1>your Answer is submitted</h1> : null}
                                   <button disabled={pro.score.submitted} onClick={this.quizHandler}>Continue</button>
                                   <button>Logout</button>  
                                   
                                          </div>
                       )
                       
                   })
              }
        
            

        }
           

                if(this.props.form){
                    console.log(this.props.form)
                    user = <Addpro/>
                }
                // let authRedirect = null;
                // if(this.props.fetched){
                //     authRedirect = <Redirect to='/quiz' />
                // }
            
            return(
                <div>
                    <Layout>
                        {/* {authRedirect} */}
        {user}
         <Modal show={this.state.continue} modalClosed={this.cancel}>
             {confirm}
             </Modal>              
                </Layout>
                </div>
               
        
            )
        }
    }

    



   

  




const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        token:state.auth.token,
        loading:state.profile.loading,
        userId:state.auth.userId,
        form: state.auth.form ,
        fetched : state.auth.fetched,
        authRedirectPath: state.profile.authRedirectPath,
        profile: state.profile.profile,
        isAdmin : state.auth.userId === '2OCao2w0T9WZGKbYgL7yplDyxtp1'
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfile : (token,userId) => dispatch(actions.fetchProfile(token,userId)),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( User, axios ));