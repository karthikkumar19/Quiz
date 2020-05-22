import React,{Component} from 'react';
import Layout from '../../hoc/Layout/Layout';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Addpro from '../Addprofile/addpro';
import Confirm from '../confirm/confirm';
import Admin from '../Admin/admin';
import classes from './user.module.css';
import Input from './input';
class User extends Component {

    componentDidMount(){
        this.props.onFetchProfile(this.props.token,this.props.userId);
        this.props.onfetchQuiz();
       
        
    }
   
state={
    continue:false,
    profile:[],
    score:false,
    quiz:false
}



quizHandler = () => {
    this.setState( { continue: true } );
}

quizCancelHandler = () => {
this.setState( { continue: false } );
}

quizContinueHandler = () => {
this.props.history.push('/quiz');
};

viewScore = () => {
this.setState({score:true})
}

    render(){
      
          
         
            let user = <Spinner/>
          let confirm = null;
          confirm = <Confirm continue={this.quizContinueHandler} cancel={this.quizCancelHandler} />

          if(!this.props.loading){
              if(this.props.isAdmin){
                  user = <Admin profile={this.props.profile} />
              }else{
                user=   this.props.profile.map((pro,ind) => {
                       return(
                         
                           <div key={ind}>
                           <h3 className={classes.welcome}>Welcome {pro.formData.name} !!</h3>
                                   {pro.score.submitted ? <h1 className={classes.submitted}>Your answer is submitted</h1> : null}
                                   <div className={classes.details}>
                                    
                                       
                                            <Input  value="Name">{pro.formData.name}</Input>
                                            <Input  value="Collge name">{pro.formData.collegeName}</Input>
                                            <Input  value="Department">{pro.formData.dept}</Input>
                                            <Input  value="Current year">{pro.formData.year}</Input>
                                            <Input  value="E-mail">{pro.formData.email}</Input>
                                            <Input  value="Ph-no">{pro.formData.phno}</Input>
                                   <div className={classes.button}>
                                   {/* <Button variant="success" disabled={pro.score.submitted}  onClick={this.quizHandler}>Continue</Button> */}
                                   <Button variant="success"  onClick={this.quizHandler}>Continue</Button>
                                   <Button variant="info" onClick={this.viewScore} >View Score</Button>  
                                   </div>  
                                   </div>
                                   {(() => {
        if (this.state.score) {
            if(pro.score.submitted){
          return (
            <h3 className={classes.score}>Your Score is {pro.score.score} <br/> Total time taken :- {pro.score.Totaltime}</h3>
          )
            }else{
                return(
<h3 className={classes.score}>Please attend the quiz to View Score</h3>
                )  
            }
        } 
      })()}       
        </div>
                       )
                       
                   })
              }
        
            

        }
           

                if(this.props.form){
                    user = <Addpro/>
                }
                let quizRedirect = null;

               
            
            return(
                <div className={classes.main}>
                     
                    <Layout>
                        {quizRedirect}
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
        fetched : state.quizdata.fetched,
        authRedirectPath: state.auth.authRedirectPath,
        profile: state.profile.profile,
        quiz:state.quizdata.questions,
        isAdmin : state.auth.userId === '2OCao2w0T9WZGKbYgL7yplDyxtp1'
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchProfile : (token,userId) => dispatch(actions.fetchProfile(token,userId)),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path)),
        onfetchQuiz : () => () => dispatch(actions.fetchData())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( User, axios ));